<script setup lang="ts" generic="Q extends Query, P extends Params, B extends Body, Ret, Zod extends ZodSchema = ZodTypeAny">
import { ZodSchema, ZodTypeAny } from "zod";
import { api } from "~/lib/api/api";
import { ApiError, BasicEndpoint, Body, Params, Query } from "~/lib/api/core";
import { match } from "~/lib/api/match";
import { transformError } from "~/lib/api/transformError";
import FormManager from "./FormManager.vue";
import LinkedForm from "./LinkedForm.vue";
import LayoutVertical from "../LayoutVertical.vue";
import LayoutHorizontal from "../LayoutHorizontal.vue";
import FormSubmit from "./Input/FormSubmit.vue";
import { Button } from "ant-design-vue";

type Props = {
  endpoint: BasicEndpoint<Q, P, B, Ret, Zod>;
  initialState: B;
  params?: P;
  query?: Q;
  validation?: (values: B, errors: Errors) => any;
  submitText?: string;
  cancelText?: string;
};

const props = defineProps<Props>();

type Errors = Record<keyof B, { message: string; type: string }>;
const form = ref<{ values: B; errors: Errors }>();

const emit = defineEmits<{
  success: [payload: Ret];
  failure: [errors: ApiError[]];
  loading: [state: boolean];
  cancel: [];
}>();

const loading = ref(false);

const onSubmit = (values: B) => {
  emit("loading", true);
  loading.value = true;
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
        emit("loading", false);
        loading.value = false;
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
    :validation="validation"
    @submit="onSubmit"
  >
    <LinkedForm v-bind="$attrs">
      <LayoutVertical>
        <slot />
        <LayoutHorizontal
          v-if="props.cancelText || props.submitText"
          class="self-end"
        >
          <Button
            v-if="props.cancelText"
            @click="emit('cancel')"
          >
            {{ props.cancelText }}
          </Button>
          <FormSubmit
            v-if="props.submitText"
            :loading
          >
            {{ props.submitText }}
          </FormSubmit>
        </LayoutHorizontal>
      </LayoutVertical>
    </LinkedForm>
  </FormManager>
</template>
