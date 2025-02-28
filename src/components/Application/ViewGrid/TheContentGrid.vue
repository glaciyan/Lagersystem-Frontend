<script setup lang="ts">
import { z } from "zod";
import SpaceCard from "~/components/Application/ItemCard/SpaceCard.vue";
import StorageCard from "~/components/Application/ItemCard/StorageCard.vue";
import { Space, Storage } from "~/api/types";

const props = defineProps<{ data: z.infer<typeof Storage> | null }>();
const emit = defineEmits<{
  openSpace: [selectedSpace: z.infer<typeof Space> ];
  ready: [container: HTMLDivElement | null];
}>();

const container = useTemplateRef<HTMLDivElement>("container");

onMounted(() => {
  emit("ready", container.value);
});
</script>

<template>
  <div
    ref="container"
    class="grid grid-auto-cols-[repeat(auto-fit,minmax(_150px,_1fr))] grid-cols-1 mt-6 w-full gap-4 2xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6 md:grid-cols-2 xl:grid-cols-3"
  >
    <TransitionGroup>
      <StorageCard
        v-for="substorage of props.data!.subStorages"
        :key="substorage.id"
        ref="storages"
        :storage="substorage"
      />
      <SpaceCard
        v-for="space of props.data!.spaces"
        :key="space.id"
        ref="spaces"
        :space="space"
        @open="emit('openSpace', space)"
      />
    </TransitionGroup>
  </div>
</template>

<style scoped>
.v-move,
.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease;
}

.v-leave-active {
  position: absolute;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
