<script setup lang="ts">
import { Button } from "ant-design-vue";
import { RouterLink } from "vue-router";
import AddIcon from "~/icons/AddIcon.vue";

const props = defineProps<{ to: string }>();

</script>

<template>
  <RouterLink :to="props.to">
    <Button
      type="primary"
    >
      <div class="align-center flex gap-2">
        <AddIcon />
        <slot />
      </div>
    </Button>
  </RouterLink>
</template>
