<script setup lang="ts">
import { RouterLink } from "vue-router";

const navigation: { path: string; name: string }[] = [
  {
    path: "/",
    name: "Characters",
  },
  {
    path: "/builds",
    name: "Your Builds",
  },
];
</script>

<template>
  <div class="flex items-center space-x-2">
    <RouterLink
      v-for="nav in navigation"
      :key="nav.path"
      :to="nav.path"
      class="text-light-ternary hover:text-light-normal whitespace-nowrap border border-dark-500 rounded-lg px-3 py-1 transition-all hover:bg-dark-500/50 hover:shadow-sm"
    >
      {{ nav.name }}
    </RouterLink>
  </div>
</template>

<style scoped>
.router-link-active,
.router-link-exact-active {
  @apply bg-dark-500 shadow-md text-light-normal hover:text-light-important;
}
</style>
