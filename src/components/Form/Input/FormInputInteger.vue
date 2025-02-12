<script setup lang="ts">
// @ts-nocheck
import type { InputProps } from "ant-design-vue";
import { InputNumber, Tooltip } from "ant-design-vue";
import { inject } from "vue";
import FormHeader from "../FormHeader.vue";

const props = defineProps<{ for: string; placeholder?: string; min?: number; title?: string } & InputProps>();
const values = inject("values") as Ref<Record<string, any>>;
const form = inject("form") as Readonly<Ref<any>>;

const error = computed(() => form.value.errors[props.for]?.message);
const hasError = computed(() => !!error.value);

// Sicherstellen, dass der initiale Wert existiert und eine Zahl ist
if (!values.value[props.for]) {
  values.value[props.for] = 0; // Initialisieren mit 0, falls nicht vorhanden
}
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
    <InputNumber
      v-model:value="values[props.for]"
      :placeholder="props.placeholder"
      :min="min ?? 0"
      :status="hasError ? 'error' : undefined"
      style="width: 100%"
    />
  </Tooltip>
</template>
