<script setup lang="ts">
import { InputSearch } from "ant-design-vue";
import SearchIcon from "~/icons/SearchIcon.vue";

const search = ref("");

const onSearch = () => {
  console.log(`searched "${search.value}"`);
};
</script>

<template>
  <InputSearch
    v-model:value="search"
    placeholder="Suche nach allem"
    enterButton="Suchen!"
    size="large"
    @search="onSearch"
  >
    <template #addonBefore>
      <SearchIcon />
    </template>
  </InputSearch>
</template>
