import { ZodSchema, ZodTypeAny } from "zod";
import { api } from "./api";
import { ApiResult, BasicEndpoint, Body, Input, Params, Query } from "./core";

export function useApi<Q extends Query = {},
  P extends Params = {},
  B extends Body = {},
  Ret = {},
  Zod extends ZodSchema = ZodTypeAny>(endpoint: BasicEndpoint<Q, P, B, Ret, Zod>, input: Input<Q, P, B>, init?: RequestInit) {
  const result = ref<ApiResult<Ret> | null>(null);

  api(endpoint, input, init).then((out) => {
    result.value = out;
  });

  return result;
}
