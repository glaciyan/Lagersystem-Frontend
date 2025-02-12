<script setup lang="ts">
import { Button } from "ant-design-vue";
import IconWithText from "./IconWithText.vue";

const emit = defineEmits(["click"]);
</script>

<template>
  <Button
    v-bind="$attrs"
    @click="emit('click')"
  >
    <IconWithText
      center
    >
      <template #icon>
        <slot name="icon" />
      </template>
      <slot />
    </IconWithText>
  </Button>
</template>
