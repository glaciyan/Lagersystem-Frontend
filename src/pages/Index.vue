<script setup lang="ts">
import PageContainer from "~/components/PageContainer";
import SearchBar from "~/components/SearchBar.vue";
import { breakpointsTailwind } from "@vueuse/core";
import GButton from "~/components/GButton/GButton.vue";

// #region Search
const search = ref("");

const breakpoints = useBreakpoints(breakpointsTailwind);
const placeholder = computed(() => {
  if (breakpoints.sm.value) {
    return "Search for Names, Materials, Elements, etc...";
  }
  else {
    return "Search...";
  }
});
// #endregion
</script>

<template>
  <PageContainer>
    <SearchBar
      v-model.trim="search"
      class="mb-6 lt-sm:mb-2"
      :placeholder="placeholder"
    />
    <GButton
      label="hello"
    />
    <GButton
      label="Hello Loading"
      loadingPosition="left"
    />
  </PageContainer>
</template>
