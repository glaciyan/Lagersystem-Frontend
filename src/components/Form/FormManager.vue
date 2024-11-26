<script setup lang="ts" generic="T">

const props = defineProps<{
  initialValues: T;
}>();

const emit = defineEmits<{
  submit: [payload: T];
}>();

const { cloned: values } = useCloned(props.initialValues, { manual: true });

provide("values", values);
provide("submit", () => emit("submit", toRaw(values.value)));
</script>

<template>
  <slot />
</template>
