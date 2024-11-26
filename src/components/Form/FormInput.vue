<script setup lang="ts">
const props = defineProps<{ name: string }>();
const values = inject("values") as Ref<any>;
</script>

<template>
  <input v-model="values[props.name]">
</template>
