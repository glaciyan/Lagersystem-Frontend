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
  <div v-if="bErrors">
    Failed to load breadcrumb
  </div>
  <div v-else-if="bAborted">
    Breadcrumb request aborted
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
      v-for="b of breadcrumb?.entries.slice(0, -1)"
      v-else
      :key="b.id"
    >
      <RouterLink
        :to="`/storage/${b.id}`"
      >
        {{ b.name }}
      </RouterLink>
    </BreadcrumbItem>
  </Breadcrumb>
</template>
