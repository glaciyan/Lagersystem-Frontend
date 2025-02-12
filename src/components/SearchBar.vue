<script setup lang="ts">
import { InputSearch } from "ant-design-vue";
import SearchIcon from "~/icons/SearchIcon.vue";

const query = defineModel<string>("query", { required: true });
const emit = defineEmits(["submit"]);
</script>

<template>
  <InputSearch
    v-model:value="query"
    placeholder="Suche nach allem"
    enterButton="Suchen!"
    size="large"
    @search="emit('submit')"
  >
    <template #addonBefore>
      <SearchIcon />
    </template>
  </InputSearch>
</template>
