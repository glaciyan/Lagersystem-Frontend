<script setup lang="ts">
import useRandomElement from "~/composites/useRandomElement";
import SearchIcon from "./icons/SearchIcon.vue";
defineProps<{ modelValue: string; placeholder?: string }>();
defineEmits(["update:modelValue"]);

const searchBar = ref<any>(null);

const { element, pickNew } = useRandomElement();

const handleClick = () => {
  pickNew();
  searchBar.value.focus();
};
</script>

<template>
  <div
    :class="[
      'rounded-lg flex bg-dark-400 shadow-md w-full transition-shadow overflow-hidden items-center focus-within:ring-2 ring-opacity-70',
      `ring-genshin-element-${element}`,
    ]"
    @click="handleClick"
  >
    <SearchIcon class="text-light-ternary mx-4" />
    <input
      ref="searchBar"
      :value="modelValue"
      class="text-light-important placeholder-light-ternary h-[42px] w-full bg-transparent pr-4 focus:outline-none"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', ($event.target as any).value)"
    >
  </div>
</template>
