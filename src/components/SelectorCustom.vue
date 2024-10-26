<script setup lang="ts">
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/vue";
import incrId from "~/lib/incrId";
import Center from "./Center.vue";
import DownChevron from "./icons/DownChevronIcon.vue";

defineProps<{ modelValue: any; listItems: any[] }>();

const id = `selector_${incrId()}`;

defineEmits(["update:modelValue"]);
</script>

<template>
  <Listbox
    v-slot="{ open }"
    :modelValue="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
  >
    <div class="relative">
      <ListboxButton
        :class="$attrs.class"
        class="w-max cursor-pointer border-r-[1px] border-dark-500 bg-dark-400 py-2 pl-4 pr-0 text-left text-base text-light-900 font-normal font-sans transition-colors hover:bg-dark-500 focus:outline-none focus-visible:ring"
      >
        <Center>
          <slot
            name="button"
            :value="modelValue"
          />
          <DownChevron
            :class="['h-5 mx-2 text-light-ternary w-5 transition-transform', { 'transform-gpu -rotate-180': open }]"
          />
        </Center>
      </ListboxButton>
      <div class="absolute">
        <transition name="fade">
          <ListboxOptions
            class="text-light-normal custom-scrollbar absolute z-1 m-0 mt-1 max-h-[350px] w-max list-none overflow-y-auto rounded-md bg-dark-300 p-0 py-1 <sm:max-h-60"
          >
            <ListboxOption
              v-for="(option, index) in listItems"
              :key="id + index"
              v-slot="{ active }"
              :value="option"
            >
              <div :class="['cursor-default flex py-2 pr-6 pl-6 items-center', { 'bg-dark-500': active }]">
                <slot
                  name="item"
                  :option="option"
                />
              </div>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </div>
  </Listbox>
</template>

<style scoped lang="less">
@import url(~/styles/scrollbar.less);

@scrollbar-foreground: #7b7b7b;
@scrollbar-background: #373739;
@scrollbar-border-size: 2px;
@scrollbar-width: 10px;
</style>
