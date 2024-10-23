<script setup lang="ts">
import ExternalLinkIcon from "./icons/ExternalLinkIcon.vue";
defineProps<{ href: string }>();
</script>

<template>
  <a
    :href="href"
    target="blank"
    rel="noopener"
    :title="href"
    class="block w-max cursor-pointer text-blue-400 hover:underline"
  >
    <div class="flex items-center">
      <slot />
      <ExternalLinkIcon class="ml-1 h-4 w-4" />
    </div>
  </a>
</template>
