<script setup lang="ts">
import type { InputProps } from "ant-design-vue";
import { Input } from "ant-design-vue";

const props = defineProps<{ for: string } & InputProps>();
const values = inject("values") as Ref<any>;
</script>

<template>
  <Input
    v-model:value="values[props.for]"
    v-bind="$attrs"
  />
</template>
