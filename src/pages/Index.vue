<script setup lang="ts">
import PageContainer from "~/components/PageContainer";
import SearchBar from "~/components/SearchBar.vue";
import { breakpointsTailwind } from "@vueuse/core";
import GButton from "~/components/GButton/GButton.vue";

//#region Search
const search = ref("");

const breakpoints = useBreakpoints(breakpointsTailwind);
const placeholder = computed(() => {
  if (breakpoints.sm.value) {
    return "Search for Names, Materials, Elements, etc...";
  } else {
    return "Search...";
  }
});
//#endregion
</script>

<template>
  <PageContainer>
    <SearchBar
      v-model.trim="search"
      class="lt-sm:mb-2 mb-6"
      :placeholder="placeholder"
    />
    <GButton class="mt-4">
      Hello World
    </GButton>
    <GButton
      class="ml-4"
      :isLoading="true"
    >
      Loading button
    </GButton>
  </PageContainer>
</template>
