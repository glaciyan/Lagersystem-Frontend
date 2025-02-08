<script setup lang="ts">
import { Spin } from "ant-design-vue";
import { endpoints } from "~/api/endpoints";
import PageContainer from "~/components/PageContainer";
import { useApi } from "~/lib/api/useApi";

const route = useRoute();
const apiQuery = reactive({
  query: {
    q: route.query.q as string || "",
  },
});
const { data, errors, loading, refetch } = useApi(endpoints.search, apiQuery);

watch(() => route.query, (value) => {
  apiQuery.query.q = value.q as string || "";
});
</script>

<template>
  <PageContainer>
    <Spin v-if="loading" />
    <div v-else>
      {{ JSON.stringify(data) }}
    </div>
  </PageContainer>
</template>
