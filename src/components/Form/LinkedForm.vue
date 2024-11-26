<script setup lang="ts">
const submit = inject("submit") as () => any;
</script>

<template>
  <form @submit.prevent="submit">
    <slot />
  </form>
</template>
