<script setup lang="ts">
import { Flex } from "ant-design-vue";

const props = withDefaults(defineProps<{
  gap?: "small" | "middle" | "large";
  align?: string;
  justify?: string;
}>(), {
  gap: "small",
  align: "start",
  justify: "normal",
});
</script>

<template>
  <Flex
    :gap="props.gap"
    :align="props.align"
    :justify="props.justify"
    vertical
  >
    <slot />
  </Flex>
</template>
