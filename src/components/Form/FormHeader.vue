<script setup lang="ts">
const props = defineProps<{ title: string }>();
</script>

<template>
  <h1 class="my-0 text-lg">
    {{ props.title }}
  </h1>
</template>
