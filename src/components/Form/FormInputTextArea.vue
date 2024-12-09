<script setup lang="ts">
import type { InputProps } from "ant-design-vue";
import { Textarea } from "ant-design-vue";

const props = defineProps<{ for: string } & InputProps>();
const values = inject("values") as Ref<any>;
</script>

<template>
  <a-textarea
    v-model:value="values[props.for]"
    v-bind="$attrs"
    placeholder="Please enter your depot description"
  />
</template>
