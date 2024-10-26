<script setup lang="ts">
defineProps<{ title: string }>();
</script>

<template>
  <div>
    <p class="text-light-important mb-4 font-semibold">
      {{ title }}
    </p>
    <slot />
  </div>
</template>
