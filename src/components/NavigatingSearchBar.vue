<script setup lang="ts">
import SearchBar from "./SearchBar.vue";
import { notification } from "ant-design-vue";

const searchQuery = ref("");
</script>

<template>
  <SearchBar
    v-model:query="searchQuery"
    @submit="() => {
      if (searchQuery.length > 0) {
        $router.push({path: '/search', query: {q: searchQuery}})
      } else {
        notification.warn({message: 'Die Suche darf nicht leer sein', duration: 2, placement: 'top'})
      }
    }"
  />
</template>
