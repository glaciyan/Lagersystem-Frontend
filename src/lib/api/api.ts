import { ZodSchema, ZodTypeAny } from "zod";
import { Query, Params, Body, BasicEndpoint, Input, ApiResult, EndpointRequest } from "./core";
import { Errors } from "./config/errors";
import { ErrorResponse } from "./types";

export async function api<Q extends Query = {},
  P extends Params = {},
  B extends Body = {},
  Ret = {},
  Zod extends ZodSchema = ZodTypeAny>(endpoint: BasicEndpoint<Q, P, B, Ret, Zod>, input: Input<Q, P, B>, init?: RequestInit): Promise<ApiResult<Ret>> {
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
    if (!init) init = {};
    const result = await fetch(request.url, {
      ...init,
      method: request.method,
      body: JSON.stringify(request.body),
    });

    try {
      if (result.ok) {
        if ("returnSchema" in endpoint && endpoint.returnSchema) {
          const apiData = await result.json();
          const apiDataParse = await endpoint.returnSchema.safeParseAsync(apiData);
          if (apiDataParse.success) {
            return {
              data: apiDataParse.data,
            };
          }
          else {
            return {
              errors: [Errors.FR_API_INVALID_FORMAT],
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
          return apiErrorParse.data;
        }
        else {
        // maybe api returned data but gave non ok
          if ("schema" in endpoint && endpoint.returnSchema) {
            const dataParse = await endpoint.returnSchema.safeParseAsync(data);
            if (dataParse.success) {
              return {
                data: dataParse.data,
              };
            }
          }
          return {
            errors: [Errors.FR_API_INVALID_FORMAT],
          };
        }
      }
    }
    catch (error) {
      if (error instanceof DOMException) {
        return {
          errors: [Errors.FE_API_REQUEST_ABORT],
        };
      }
      else if (error instanceof TypeError) {
        return {
          errors: [Errors.FE_API_REQUEST_TYPE_ERROR],
        };
      }
      else if (error instanceof SyntaxError) {
        return {
          errors: [Errors.FE_API_REQUEST_SYNTAX_ERROR],
        };
      }
      else {
        return {
          errors: [Errors.FR_API_UNKNOWN],
        };
      }
    }
  }
  catch (err) {
    if (err instanceof DOMException) {
      return {
        errors: [Errors.FR_API_FETCH_ENVIRONMENT_INVALID],
      };
    }
    else if (err instanceof TypeError) {
      return {
        errors: [Errors.FR_API_FETCH_FAILED],
      };
    }
    else {
      return {
        errors: [Errors.FR_API_UNKNOWN],
      };
    }
  }
}

// const content = await result.json();

// const parsed = (await endpoint.schema?.parseAsync(content)) as Ret;

// return { data: parsed };
