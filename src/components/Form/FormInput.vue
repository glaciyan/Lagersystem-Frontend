<script setup lang="ts">
const props = defineProps<{ for: string }>();
const values = inject("values") as Ref<any>;
</script>

<template>
  <input
    v-model="values[props.for]"
    v-bind="$attrs"
  >
</template>
