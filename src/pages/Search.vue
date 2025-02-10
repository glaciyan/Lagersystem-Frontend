<script setup lang="ts">
import { Spin } from "ant-design-vue";
import { endpoints } from "~/api/endpoints";
import PageContainer from "~/components/PageContainer";
import SearchResult from "~/components/SearchResult.vue";
import { useApi } from "~/lib/api/useApi";

const route = useRoute();

const apiQuery = reactive({
  query: {
    q: route.query.q as string || "",
  },
});

watch(() => route.query, (value) => {
  apiQuery.query.q = value.q as string || "";
});

const { data, loading } = useApi(endpoints.search, apiQuery);
</script>

<template>
  <PageContainer>
    <Spin v-if="loading" />
    <div v-else>
      <h1 class="text-2xl font-bold">
        Ergebnisse für "{{ apiQuery.query.q }}"
      </h1>
      <SearchResult
        v-for="result in data"
        :key="result.id"
        :result="result"
      />
    </div>
  </PageContainer>
</template>
