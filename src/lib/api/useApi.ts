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
  const backgroundLoading = ref(false);
  const aborted = ref(false);

  const baseInput = isRef(input) ? input.value as any : input;
  const reactiveInput = isReactive(baseInput) ? baseInput : reactive(baseInput);

  let controller = new AbortController();

  const internalAbort = (setAbort: boolean = true) => {
    controller.abort();
    controller = new AbortController();
    errors.value = null;
    aborted.value = setAbort;
  };

  const abort = () => internalAbort();

  const doFetch = (background: boolean) => {
    aborted.value = false;
    loading.value = !background;
    backgroundLoading.value = background;
    api(endpoint, input, init, controller).then((out) => {
      result.value = out;
    }).catch(() => console.error("Unexpected error from useApi"));
  };

  const refetch = (background = true) => {
    internalAbort(false);
    doFetch(background);
  };

  watchEffect(() => {
    if (result.value) {
      loading.value = false;
      backgroundLoading.value = false;
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
    refetch(false);
    console.log("Reactive refetch", input, endpoint);
  }, { deep: true });

  if (immediate) {
    doFetch(false);
  }

  return { data, errors, loading, backgroundLoading, aborted, abort, refetch };
}
