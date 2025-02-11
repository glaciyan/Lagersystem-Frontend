<script setup lang="ts">
import ReloadIcon from "~/icons/ReloadIcon.vue";
import IconButton from "../IconButton.vue";

const props = defineProps<{ refetch?: () => void }>();
</script>

<template>
  <IconButton
    v-if="props.refetch"
    @click="props.refetch"
  >
    <template #icon>
      <ReloadIcon />
    </template>
    Neu Laden
  </IconButton>
</template>
