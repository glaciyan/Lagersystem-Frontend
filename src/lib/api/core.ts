import { z, ZodSchema, ZodTypeAny } from "zod";
import { ErrorResponse, ErrorSchema } from "./coreTypes";

export const BASE_URL = import.meta.env.VITE_API_ENDPOINT_URL;

if (!BASE_URL) {
  console.error("No valid API URL found");
}

export type Query = Record<string, string | number | boolean>;
export type Params = Record<string, string | number>;
export type Body = Record<string, any>;

export type Methods = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
export type Path<P extends Params> = string | ((p: P) => string);

export interface BasicEndpoint<
  Q extends Query,
  P extends Params,
  B extends Body,
  Ret,
  RetZod extends ZodSchema = ZodTypeAny,
> {
  method: Methods;
  path: Path<P>;
  base: string;

  /**
   * Schema will determine if the endpoint is going to return a value
   */
  returnSchema?: RetZod;

  withQuery: <QNew extends Query>() => BasicEndpoint<QNew, P, B, Ret, RetZod>;
  withBody: <BNew extends Body>() => BasicEndpoint<Q, P, BNew, Ret, RetZod>;
  returns: <Z>(schema: ZodSchema<Z>) => BasicEndpoint<Q, P, B, z.infer<typeof schema>, typeof schema>;

  applyQuery?: (query: Q, req: EndpointRequest) => void;
  applyBody?: (body: B, req: EndpointRequest) => void;
}

export const applyQuery = <Q extends Query>(query: Q, req: EndpointRequest) => {
  for (const [name, value] of Object.entries(query)) {
    req.url.searchParams.append(name, String(value));
  }
};

export const applyBody = <B extends Body>(body: B, req: EndpointRequest) => {
  req.body = body;
};

export interface EndpointRequest {
  url: URL;
  method: Methods;
  body?: Body;
  extras?: RequestInit;
}

export type ApiError = z.infer<typeof ErrorSchema>;
export type ApiErrors = z.infer<typeof ErrorResponse>;

export type ApiResult<T> = { data: T } | ApiErrors;

// export type ApiResult<T> = Result<T, ApiError>;

type PickRequired<T> = {
  [K in keyof T as undefined extends T[K] ? never : K]: T[K];
};

type InputFields = "query" | "params" | "body";

// check if T has fields and if yes, make it required if it has any required fields inside of it
type HasRequired<T, S extends InputFields> = keyof T extends never ? {} : (keyof PickRequired<T> extends never ? { [K in S]?: T } : { [K in S]: T });

export type Input<Q, P, B> = HasRequired<Q, "query"> & HasRequired<P, "params"> & HasRequired<B, "body">;
