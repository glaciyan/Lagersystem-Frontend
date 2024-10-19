<script setup lang="ts">
import PageContainer from "~/components/PageContainer";
import SearchBar from "~/components/SearchBar.vue";
import { breakpointsTailwind } from "@vueuse/core";
import TestingCard from "~/components/TestingCard.vue";

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
    <div
      class="grid gap-2 lt-md:gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    >
      <TestingCard />
      <TestingCard />
      <TestingCard />
      <TestingCard />
      <TestingCard />
      <TestingCard />
      <TestingCard />
      <TestingCard />
      <TestingCard />
      <TestingCard />
      <TestingCard />
      <TestingCard />
      <TestingCard />
      <TestingCard />
      <TestingCard />
      <TestingCard />
      <TestingCard />
    </div>
  </PageContainer>
</template>
