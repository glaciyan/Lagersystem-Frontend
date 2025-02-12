<script setup lang="ts">
import { Button } from "ant-design-vue";
import { ButtonType } from "ant-design-vue/es/button/buttonTypes";

const props = withDefaults(defineProps<{ loading: boolean; type?: ButtonType }>(), { type: "primary" });
</script>

<template>
  <Button
    htmlType="submit"
    :type="props.type"
    :loading="props.loading"
  >
    <slot />
  </Button>
</template>
