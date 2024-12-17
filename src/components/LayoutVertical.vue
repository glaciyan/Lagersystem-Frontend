<script setup lang="ts">
import { Flex } from "ant-design-vue";

const props = withDefaults(defineProps<{
  gap?: "small" | "middle" | "large";
  align?: string;
}>(), {
  gap: "small",
  align: "start",
});
</script>

<template>
  <Flex
    :gap="props.gap"
    :align="props.align"
    vertical
  >
    <slot />
  </Flex>
</template>
