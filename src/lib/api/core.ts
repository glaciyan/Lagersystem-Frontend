import { z, ZodSchema, ZodTypeAny } from "zod";

export interface QueryMap {
  [key: string]: string | number | boolean | undefined;
}

export interface Params {
  [key: string]: string | number | undefined;
}

export interface Body {
  [key: string]: any;
}

export type Methods = "GET" | "POST" | "PUT" | "DELETE";

// The BasicEndpoint interface with improved generics
export interface BasicEndpoint<
  Q extends QueryMap = {},
  P extends Params = {},
  B extends Body = {},
  Ret = {},
  Zod extends ZodSchema = ZodTypeAny,
> {
  method: Methods;
  base: string;

  /**
   * Schema will determine if the endpoint is going to return a value
   */
  schema?: Zod;

  // Add query, params, or body to the endpoint
  withQuery: <QNew extends QueryMap>() => BasicEndpoint<QNew, P, B, Ret, Zod>;
  withParams: <PNew extends Params>() => BasicEndpoint<Q, PNew, B, Ret, Zod>;
  withBody: <BNew extends Body>() => BasicEndpoint<Q, P, BNew, Ret, Zod>;
  returns: <Z>(schema: ZodSchema<Z>) => BasicEndpoint<Q, P, B, z.infer<typeof schema>, typeof schema>;

  // Applied values
  applyQuery?: (query?: Q) => void;
  applyParams?: (params?: P) => void;
  applyBody?: (body?: B) => void;
}

// Implementation of the BasicEndpoint
export function glue(method: Methods, base: string): BasicEndpoint {
  return {
    method,
    base,

    withQuery<QNew extends QueryMap>() {
      const applyQuery = (query?: QNew) => {
        console.log("Applied query:", query);
      };

      return {
        ...this,
        applyQuery,
      };
    },

    withParams<PNew extends Params>() {
      const applyParams = (params?: PNew) => {
        console.log("Applied params:", params);
      };

      return {
        ...this,
        applyParams,
      };
    },

    withBody<BNew extends Body>() {
      const applyBody = (body?: BNew) => {
        console.log("Applied body:", body);
      };

      return {
        ...this,
        applyBody,
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
