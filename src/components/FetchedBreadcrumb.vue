<script setup lang="ts">
import { endpoints } from "~/api/endpoints";
import { useApi } from "~/lib/api/useApi";
import LBreadcrumb from "./LBreadcrumb.vue";

const props = defineProps<{ id: string }>();
const emit = defineEmits<{
  ready: [HTMLDivElement | null];
}>();

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
  <LBreadcrumb
    v-else
    :id="props.id"
    :bLoading
    :breadcrumb="breadcrumb?.entries ?? []"
    @ready="(c) => emit('ready', c)"
  />
</template>
