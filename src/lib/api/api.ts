import { ZodSchema, ZodTypeAny } from "zod";
import { Query, Params, Body, BasicEndpoint, Input, ApiResult, ApiError, EndpointRequest } from "./core";

export async function api<Q extends Query = {},
  P extends Params = {},
  B extends Body = {},
  Ret = {},
  Zod extends ZodSchema = ZodTypeAny>(endpoint: BasicEndpoint<Q, P, B, Ret, Zod>, input: Input<Q, P, B>): Promise<ApiResult<Ret, ApiError>> {
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

  const result = await fetch(request.url, {
    method: request.method,
    body: JSON.stringify(request.body),
  });

  const content = await result.json();

  const parsed = (await endpoint.schema?.parseAsync(content)) as Ret;

  return { data: parsed };
};
