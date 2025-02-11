<script setup lang="ts">
defineProps<{ center?: boolean }>();
</script>

<template>
  <div :class="['flex items-center gap-1.5', {'justify-center': center}]">
    <div class="flex-shrink-0">
      <slot name="icon" />
    </div>
    <slot />
  </div>
</template>
