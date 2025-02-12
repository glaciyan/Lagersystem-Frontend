<script setup lang="ts">
import { Checkbox, CheckboxProps, Tooltip } from "ant-design-vue";
import FormHeader from "../FormHeader.vue";

const props = defineProps<{ for: string; placeholder?: string; title?: string; tooltip?: string } & CheckboxProps>();
const values = inject("values") as Ref<any>;
</script>

<template>
  <FormHeader
    v-if="props.title"
    :title="props.title"
  />
  <Tooltip v-if="tooltip">
    <template #title>
      {{ tooltip }}
    </template>
    <Checkbox v-model:checked="values[props.for]">
      <slot />
    </Checkbox>
  </Tooltip>
  <Checkbox
    v-else
    v-model:checked="values[props.for]"
  >
    <slot />
  </Checkbox>
</template>
