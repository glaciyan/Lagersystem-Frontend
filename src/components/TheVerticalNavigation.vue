<script setup lang="ts">
import { RouterLink } from "vue-router";

const navigation: { path: string; name: string }[] = [
  {
    path: "/",
    name: "Depots",
  },
];
</script>

<template>
  <div class="flex items-center space-x-2">
    <RouterLink
      v-for="nav in navigation"
      :key="nav.path"
      :to="nav.path"
      class="whitespace-nowrap border border-dark-500 rounded-lg px-4 py-2 decoration-none transition-all hover:bg-dark-500/50 !text-light-9 hover:shadow-sm !hover:text-light-9"
    >
      {{ nav.name }}
    </RouterLink>
  </div>
</template>

<style scoped>
.router-link-active,
.router-link-exact-active {
  @apply bg-dark-400 shadow-md !text-light-500 !hover:text-light-100;
}
</style>
