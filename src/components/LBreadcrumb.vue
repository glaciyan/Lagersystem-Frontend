<script setup lang="ts">
import { Breadcrumb, BreadcrumbItem } from "ant-design-vue";
import { Spin } from "ant-design-vue";

export type BItem = {
  id: string;
  name: string;
  type: string;
};

const props = defineProps<{ breadcrumb: BItem[]; id: string; bLoading?: boolean }>();
</script>

<template>
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
      <RouterLink
        v-if="b.type === 'storage' && b.id !== props.id"
        :to="`/storage/${b.id}`"
      >
        {{ b.name }}
      </RouterLink>
      <div v-else>
        {{ b.name }}
      </div>
    </BreadcrumbItem>
  </Breadcrumb>
</template>
