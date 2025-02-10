<script setup lang="ts">
import { Result, Spin } from "ant-design-vue";
import { endpoints } from "~/api/endpoints";
import ErrorDisplay from "~/components/ErrorDisplay.vue";
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

const { data, loading, errors } = useApi(endpoints.search, apiQuery);
</script>

<template>
  <PageContainer>
    <ErrorDisplay
      v-if="errors"
      :errors
    />
    <Spin v-else-if="loading" />
    <Result
      v-else-if="!data || data.length <= 0"
      status="404"
      title="Keine Ergebnisse gefunden."
      subTitle="Versuche andere Begriffe, erweitere deine Suche und bleib dran - die Antwort wartet auf dich!"
    />
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
