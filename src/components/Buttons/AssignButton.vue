<script setup lang="ts">
import { Button } from "ant-design-vue";
import { RouterLink } from "vue-router";
import AssignIcon from "~/icons/AssignIcon.vue";

const props = defineProps<{ to: string }>();

</script>

<template>
  <RouterLink :to="props.to">
    <Button>
      <div class="flex flex-wrap items-center justify-center gap-2">
        <AssignIcon />
        <slot />
      </div>
    </Button>
  </RouterLink>
</template>
