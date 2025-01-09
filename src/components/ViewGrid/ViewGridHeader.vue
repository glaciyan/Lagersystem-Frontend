<script setup lang="ts">
import ReloadButton from "../Buttons/ReloadButton.vue";

const props = defineProps<{ header: string; refetch?: () => void }>();
</script>

<template>
  <div class="flex flex-wrap content-center gap-6">
    <h1 class="m-0 text-xl">
      {{ props.header }}
    </h1>

    <slot />

    <ReloadButton :refetch="props.refetch" />
  </div>
</template>
