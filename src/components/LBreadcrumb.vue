<script setup lang="ts">
import { Breadcrumb, BreadcrumbItem } from "ant-design-vue";
import { Spin } from "ant-design-vue";

export type BItem = {
  id: string;
  name: string;
  type: string;
};

const props = defineProps<{ breadcrumb: BItem[]; id: string; bLoading?: boolean; reffer?: boolean }>();
const refferal = computed(() => props.reffer ? `?ref=${props.id}` : "");
const emit = defineEmits<{
  ready: [HTMLDivElement | null];
}>();
const container = useTemplateRef("container");

onMounted(() => {
  emit("ready", container.value);
});
</script>

<template>
  <div ref="container">
    <Breadcrumb>
      <BreadcrumbItem>
        <RouterLink to="/">
          Depots
        </RouterLink>
      </BreadcrumbItem>
      <BreadcrumbItem v-if="bLoading">
        <Spin size="small" />
      </BreadcrumbItem>
      <BreadcrumbItem
        v-for="b of breadcrumb"
        v-else
        :key="b.id"
      >
        <span
          v-if="b.type === 'storage' && b.id !== props.id"
          :l-data-id="b.id"
          l-data-type="storage"
        >
          <RouterLink

            :to="`/storage/${b.id}${refferal}`"
          >
            {{ b.name }}
          </RouterLink>
        </span>
        <span v-else>
          {{ b.name }}
        </span>
      </BreadcrumbItem>
    </Breadcrumb>
  </div>
</template>

<style scoped>
.drag-success {
  @apply bg-cyan-3/20;
}

.drag-fail {
  @apply bg-red-3/20;
}
</style>
