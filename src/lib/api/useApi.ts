import { ZodSchema, ZodTypeAny } from "zod";
import { api } from "./api";
import { ApiError, ApiResult, BasicEndpoint, Body, Input, Params, Query } from "./core";
import { match } from "./match";

export function useApi<Q extends Query = {},
  P extends Params = {},
  B extends Body = {},
  Ret = {},
  Zod extends ZodSchema = ZodTypeAny>(endpoint: BasicEndpoint<Q, P, B, Ret, Zod>, input: MaybeRef<Input<Q, P, B>>, init?: RequestInit, immediate = true) {
  const result = ref<ApiResult<Ret> | null>(null);
  const data = ref<Ret | null>(null);
  const errors = ref<ApiError[] | null>(null);
  const loading = ref(true);
  const aborted = ref(false);

  const baseInput = isRef(input) ? input.value as any : input;
  const reactiveInput = isReactive(baseInput) ? baseInput : reactive(baseInput);

  let controller = new AbortController();

  const internalAbort = (setAbort: boolean = true) => {
    controller.abort();
    controller = new AbortController();
    data.value = null;
    errors.value = null;
    aborted.value = setAbort;
  };

  const abort = () => internalAbort();

  const doFetch = () => {
    aborted.value = false;
    loading.value = true;
    api(endpoint, input, init, controller).then((out) => {
      result.value = out;
    }).catch(() => console.error("Unexpected error from useApi"));
  };

  const refetch = () => {
    internalAbort(false);
    doFetch();
  };

  watchEffect(() => {
    if (result.value) {
      loading.value = false;
      match(result.value, {
        ok: (val) => {
          data.value = val;
          errors.value = null;
        },
        error: (err) => {
          errors.value = err;
        },
      });
    }
    else {
      loading.value = true;
    }
  });

  watch(reactiveInput, () => {
    refetch();
    console.log("Reactive refetch", input, endpoint);
  }, { deep: true });

  if (immediate) {
    doFetch();
  }

  return { data, errors, loading, aborted, abort, refetch };
}
