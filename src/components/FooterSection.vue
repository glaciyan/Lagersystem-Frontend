<script setup lang="ts">
defineProps<{ title: string }>();
</script>

<template>
  <div>
    <p class="mb-4 text-light-important font-semibold">
      {{ title }}
    </p>
    <slot />
  </div>
</template>
