<script setup lang="ts">
// @ts-nocheck
import { Textarea, Tooltip, type InputProps } from "ant-design-vue";
import FormHeader from "../FormHeader.vue";

const props = defineProps<{ for: string; placeholder?: string; title?: string } & InputProps>();
const values = inject("values") as Ref<any>;
const form = inject("form") as Readonly<Ref<any>>;

const error = computed(() => form.value.errors[props.for]?.message);
const hasError = computed(() => !!error.value);
</script>

<template>
  <FormHeader
    v-if="title"
    :title
  />
  <Tooltip
    v-model:open="hasError"
    placement="left"
    color="hsl(0, 12%, 14%)"
    trigger=""
  >
    <template #title>
      <span class="text-rose-4">{{ error }}</span>
    </template>
    <Textarea
      v-model:value="values[props.for]"
      v-bind="$attrs"
      :placeholder="props.placeholder"
      :status="hasError ? 'error' : undefined"
    />
  </Tooltip>
</template>
