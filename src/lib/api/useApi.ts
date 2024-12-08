import { ZodSchema, ZodTypeAny } from "zod";
import { api } from "./api";
import { ApiError, ApiResult, BasicEndpoint, Body, Input, Params, Query } from "./core";
import { match } from "./match";

export function useApi<Q extends Query = {},
  P extends Params = {},
  B extends Body = {},
  Ret = {},
  Zod extends ZodSchema = ZodTypeAny>(endpoint: BasicEndpoint<Q, P, B, Ret, Zod>, input: Input<Q, P, B>, init?: RequestInit) {
  const result = ref<ApiResult<Ret> | null>(null);
  const data = ref<Ret | null>(null);
  const errors = ref<ApiError[] | null>(null);
  const loading = ref(true);

  api(endpoint, input, init).then((out) => {
    result.value = out;
  });

  const fetchData = async () => {
    loading.value = true;
    try {
      const out = await api(endpoint, input, init);
      result.value = out;
    }
    catch (error) {
      console.error("API request failed", error);
    }
  };

  fetchData();

  watchEffect(() => {
    if (result.value) {
      loading.value = false;
      match(result.value, {
        ok: val => data.value = val,
        error: err => errors.value = err,
      });
    }
    else {
      loading.value = true;
    }
  });

  return { data, errors, loading, refetch: fetchData };
}
