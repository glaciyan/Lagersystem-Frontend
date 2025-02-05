<script setup lang="ts">
import { Breadcrumb, BreadcrumbItem, Spin } from "ant-design-vue";
import { endpoints } from "~/api/endpoints";
import { useApi } from "~/lib/api/useApi";

const props = defineProps<{ id: string }>();

const apiInput = reactive({
  params: {
    id: props.id,
  },
});

watch(() => props.id, (newId) => {
  apiInput.params.id = newId;
});

const { data: breadcrumb, errors: bErrors, loading: bLoading, aborted: bAborted } = useApi(endpoints.breadcrumb, apiInput);
</script>

<template>
  <div v-if="bAborted">
    Breadcrumb request aborted
  </div>
  <div v-else-if="bErrors">
    Failed to load breadcrumb
  </div>
  <Breadcrumb v-else>
    <BreadcrumbItem>
      <RouterLink to="/">
        Depots
      </RouterLink>
    </BreadcrumbItem>
    <BreadcrumbItem v-if="bLoading">
      <Spin size="small" />
    </BreadcrumbItem>
    <BreadcrumbItem
      v-for="b of breadcrumb?.entries"
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
