import { ZodSchema, ZodTypeAny } from "zod";
import { Query, Params, Body, BasicEndpoint, Input, ApiResult, EndpointRequest } from "./core";
import { Errors } from "./errors";
import { ErrorResponse } from "./types";

export async function api<Q extends Query = {},
  P extends Params = {},
  B extends Body = {},
  Ret = {},
  Zod extends ZodSchema = ZodTypeAny>(endpoint: BasicEndpoint<Q, P, B, Ret, Zod>, input: Input<Q, P, B>): Promise<ApiResult<Ret>> {
  const request: EndpointRequest = { url: new URL(endpoint.base), method: endpoint.method };

  if ("query" in input && endpoint.applyQuery && input.query) {
    endpoint.applyQuery(input.query, request);
  }

  if (typeof (endpoint.path) === "string") {
    request.url.pathname = endpoint.path;
  }
  else if ("params" in input && input.params) {
    const dynamicPath = endpoint.path(input.params);
    if (dynamicPath) {
      request.url.pathname = dynamicPath;
    }
  }

  if ("body" in input && endpoint.applyBody && input.body) {
    endpoint.applyBody(input.body, request);
  }

  try {
    const result = await fetch(request.url, {
      method: request.method,
      body: JSON.stringify(request.body),
    });

    try {
      if (result.ok) {
        if ("schema" in endpoint && endpoint.schema) {
          const apiData = await result.json();
          const apiDataParse = await endpoint.schema.safeParseAsync(apiData);
          if (apiDataParse.success) {
            return {
              data: apiDataParse.data,
            };
          }
          else {
            return {
              error: [Errors.FR_API_INVALID_FORMAT],
            };
          }
        }
        else {
        // no schema => no return from api
          return {
            data: {} as Ret,
          };
        }
      }
      else {
        const data = await result.json();
        // see if api returned errors
        const apiErrorParse = await ErrorResponse.safeParseAsync(data);
        if (apiErrorParse.success) {
          return {
            error: apiErrorParse.data,
          };
        }
        else {
        // maybe api returned data but gave non ok
          if ("schema" in endpoint && endpoint.schema) {
            const dataParse = await endpoint.schema.safeParseAsync(data);
            if (dataParse.success) {
              return {
                data: dataParse.data,
              };
            }
          }
          return {
            error: [Errors.FR_API_INVALID_FORMAT],
          };
        }
      }
    }
    catch (error) {
      if (error instanceof DOMException) {
        return {
          error: [Errors.FE_API_REQUEST_ABORT],
        };
      }
      else if (error instanceof TypeError) {
        return {
          error: [Errors.FE_API_REQUEST_TYPE_ERROR],
        };
      }
      else if (error instanceof SyntaxError) {
        return {
          error: [Errors.FE_API_REQUEST_SYNTAX_ERROR],
        };
      }
      else {
        return {
          error: [Errors.FR_API_UNKNOWN],
        };
      }
    }
  }
  catch (err) {
    if (err instanceof DOMException) {
      return {
        error: [Errors.FR_API_FETCH_ENVIRONMENT_INVALID],
      };
    }
    else if (err instanceof TypeError) {
      return {
        error: [Errors.FR_API_FETCH_FAILED],
      };
    }
    else {
      return {
        error: [Errors.FR_API_UNKNOWN],
      };
    }
  }
}

// const content = await result.json();

// const parsed = (await endpoint.schema?.parseAsync(content)) as Ret;

// return { data: parsed };
