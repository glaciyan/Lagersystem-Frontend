<script setup lang="ts">
import SearchIcon from "./icons/SearchIcon.vue";

defineProps<{ term: string }>();
defineEmits(["click"]);
</script>

<template>
  <div
    class="h-[42px] w-full w-max flex cursor-pointer items-center overflow-hidden rounded-lg bg-dark-400 shadow-md transition-shadow"
    :title="`Search for ${term}`"
    @click="$emit('click', term)"
  >
    <SearchIcon class="mx-4 text-light-ternary" />
    <p class="mr-8">
      {{ term }}
    </p>
  </div>
</template>
