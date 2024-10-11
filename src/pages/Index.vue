<script setup lang="ts">
import Container from "~/components/PageContainer";
import SearchBar from "~/components/SearchBar.vue";
import { breakpointsTailwind } from "@vueuse/core";

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

//#region Search help
const mockSuggestClick = (newVal: string) => {
  search.value = newVal;
};
//#endregion

const router = useRouter();
</script>

<template>
  <Container>
    <SearchBar v-model.trim="search" class="mb-6 <sm:mb-2" :placeholder="placeholder" />
    <div>Hello world!</div>
  </Container>
</template>
