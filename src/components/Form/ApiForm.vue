<script setup lang="ts" generic="Q extends Query, P extends Params, B extends Body, Ret, Zod extends ZodSchema = ZodTypeAny">
import { ZodSchema, ZodTypeAny } from "zod";
import { api } from "~/lib/api/api";
import { ApiError, BasicEndpoint, Body, Params, Query } from "~/lib/api/core";
import { match } from "~/lib/api/match";
import { transformError } from "~/lib/api/transformError";
import FormManager from "./FormManager.vue";
import LinkedForm from "./LinkedForm.vue";

type Props = {
  endpoint: BasicEndpoint<Q, P, B, Ret, Zod>;
  initialState: B;
  params?: P;
  query?: Q;
};

const props = defineProps<Props>();

type Errors = Record<keyof B, { message: string; type: string }>;
const form = ref<{ values: B; errors: Errors }>();

const emit = defineEmits<{
  success: [payload: Ret];
  failure: [errors: ApiError[]];
}>();

const onSubmit = (values: B) => {
  api(props.endpoint, {
    body: values,
    params: props.params,
    query: props.query,
  }, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then((result) => {
    match(result, {
      ok: (data) => {
        emit("success", data);
      },
      error: (err) => {
        if (form.value) {
          form.value.errors = transformError(err) as Errors;
        }
        emit("failure", err);
      },
    });
  });
};
</script>

<template>
  <FormManager
    v-model="form"
    :initialValues="props.initialState"
    @submit="onSubmit"
  >
    <LinkedForm v-bind="$attrs">
      <slot />
    </LinkedForm>
  </FormManager>
</template>
