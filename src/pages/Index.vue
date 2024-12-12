<script setup lang="ts">
import { Button } from "ant-design-vue";
import LayoutVertical from "~/components/LayoutVertical.vue";
import PageContainer from "~/components/PageContainer";
import { endpoints } from "~/lib/api/config/endpoints";
import { useApi } from "~/lib/api/useApi";

const { data, loading, errors, aborted, abort, refetch } = useApi(endpoints.getStorages, {});
</script>

<template>
  <PageContainer>
    <!-- Display when the fetch request was aborted -->
    <LayoutVertical v-if="aborted">
      <Button @click="refetch">
        Retry
      </Button>
      <div>Request was aborted.</div>
    </LayoutVertical>

    <!-- Loading state with option to abort -->
    <LayoutVertical v-else-if="loading">
      <Button
        danger
        @click="abort"
      >
        Abort
      </Button>
      <div>Loading data, please wait...</div>
    </LayoutVertical>

    <!-- Error state with retry option -->
    <LayoutVertical v-else-if="errors">
      <Button @click="refetch">
        Retry
      </Button>
      <div class="text-red">
        <strong>Error:</strong> Failed to fetch data.
      </div>
    </LayoutVertical>

    <!-- Render data -->
    <LayoutVertical v-else>
      <Button
        @click="refetch"
      >
        Retry
      </Button>
      <div v-if="data?.length">
        <div
          v-for="storage in data"
          :key="storage.id"
        >
          {{ storage.name }} - {{ storage.id }}
        </div>
      </div>
      <div v-else>
        No storage data available.
      </div>
    </LayoutVertical>
  </PageContainer>
</template>
