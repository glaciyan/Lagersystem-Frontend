import { z, ZodSchema, ZodTypeAny } from "zod";
import { ErrorResponse } from "./types";

export const BASE_URL = import.meta.env.VITE_API_ENDPOINT_URL;

if (!BASE_URL) {
  console.error("No valid API URL found");
}

export type Query = Record<string, string | number | boolean>;
export type Params = Record<string, string | number>;
export type Body = Record<string, any>;

export type Methods = "GET" | "POST" | "PUT" | "DELETE";
export type Path<P extends Params> = string | ((p: P) => string);

export interface BasicEndpoint<
  Q extends Query,
  P extends Params,
  B extends Body,
  Ret,
  Zod extends ZodSchema = ZodTypeAny,
> {
  method: Methods;
  path: Path<P>;
  base: string;

  /**
   * Schema will determine if the endpoint is going to return a value
   */
  schema?: Zod;

  withQuery: <QNew extends Query>() => BasicEndpoint<QNew, P, B, Ret, Zod>;
  // withParams: <PNew extends Params>() => BasicEndpoint<Q, PNew, B, Ret, Zod>;
  withBody: <BNew extends Body>() => BasicEndpoint<Q, P, BNew, Ret, Zod>;
  returns: <Z>(schema: ZodSchema<Z>) => BasicEndpoint<Q, P, B, z.infer<typeof schema>, typeof schema>;

  applyQuery?: (query: Q, req: EndpointRequest) => void;
  // applyParams?: (params: P, req: EndpointRequest) => void;
  applyBody?: (body: B, req: EndpointRequest) => void;
}

const applyQuery = <Q extends Query>(query: Q, req: EndpointRequest) => {
  for (const [name, value] of Object.entries(query)) {
    req.url.searchParams.append(name, String(value));
  }
};

const applyBody = <B extends Body>(body: B, req: EndpointRequest) => {
  req.body = body;
};

export function endpoint<P extends Params = {}>(method: Methods, path: Path<P>): BasicEndpoint<{}, P, {}, {}> {
  return {
    method,
    path,
    base: BASE_URL,

    withQuery<QNew extends Query>() {
      return {
        ...this,
        applyQuery: applyQuery<QNew>,
      };
    },

    // withParams<PNew extends Params>() {
    //   const applyParams = (params: PNew, req: EndpointRequest) => {
    //     console.log("Applied params:", params);
    //   };

    //   return {
    //     ...this,
    //     applyParams,
    //   };
    // },

    withBody<BNew extends Body>() {
      return {
        ...this,
        applyBody: applyBody<BNew>,
      };
    },

    returns<Z>(schema: ZodSchema<Z>) {
      return {
        ...this,
        schema,
      };
    },
  };
}

export interface EndpointRequest {
  url: URL;
  method: Methods;
  body?: Body;
}

export type ApiError = z.infer<typeof ErrorResponse>;

export type Result<T, E> = { data: T } | { error: E };

export type ApiResult<T> = Result<T, ApiError>;

type PickRequired<T> = {
  [K in keyof T as undefined extends T[K] ? never : K]: T[K];
};

type InputFields = "query" | "params" | "body";

// check if T has fields and if yes, make it required if it has any required fields inside of it
type HasRequired<T, S extends InputFields> = keyof T extends never ? {} : (keyof PickRequired<T> extends never ? { [K in S]?: T } : { [K in S]: T });

export type Input<Q, P, B> = HasRequired<Q, "query"> & HasRequired<P, "params"> & HasRequired<B, "body">;
