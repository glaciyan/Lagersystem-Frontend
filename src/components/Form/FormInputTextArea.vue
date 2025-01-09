<script setup lang="ts">
import { Textarea, type InputProps } from "ant-design-vue";

const props = defineProps<{ for: string; placeholder?: string } & InputProps>();
const values = inject("values") as Ref<any>;
</script>

<template>
  <Textarea
    v-model:value="values[props.for]"
    v-bind="$attrs"
    :placeholder="props.placeholder"
  />
</template>
