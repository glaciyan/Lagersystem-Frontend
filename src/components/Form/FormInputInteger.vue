<script setup lang="ts">
import type { InputProps } from "ant-design-vue";
import { InputNumber } from "ant-design-vue";
import { inject } from "vue";

const props = defineProps<{ for: string; placeholder?: string; min?: number } & InputProps>();
const values = inject("values") as Ref<Record<string, any>>;

// Sicherstellen, dass der initiale Wert existiert und eine Zahl ist
if (!values.value[props.for]) {
  values.value[props.for] = 0; // Initialisieren mit 0, falls nicht vorhanden
}
</script>

<template>
  <InputNumber
    v-model:value="values[props.for]"
    :placeholder="props.placeholder"
    :min="min ?? 0"
  />
</template>
