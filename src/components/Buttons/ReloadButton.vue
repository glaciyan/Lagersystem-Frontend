<script setup lang="ts">
import ReloadIcon from "~/icons/ReloadIcon.vue";
import { h } from "vue";
import { Button } from "ant-design-vue";

const props = defineProps<{ refetch?: () => void }>();
</script>

<template>
  <Button
    v-if="refetch"
    :icon="h(ReloadIcon)"
    @click="props.refetch"
  >
    Neu Laden
  </Button>
</template>
