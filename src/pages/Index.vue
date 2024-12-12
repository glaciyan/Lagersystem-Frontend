<script setup lang="ts">
import { Button } from "ant-design-vue";
import PageContainer from "~/components/PageContainer";
import { endpoints } from "~/lib/api/config/endpoints";
import { useApi } from "~/lib/api/useApi";

const { data, loading, errors, abort } = useApi(endpoints.getStorages, {});
</script>

<template>
  <PageContainer>
    <div v-if="loading">
      <div>Loading...</div>
      <Button
        danger
        @click="abort"
      >
        Abort
      </Button>
    </div>
    <div v-else-if="errors != null">
      <div class="text-red">
        Failed to fetch data.
      </div>
      <Button
        @click="abort"
      >
        Retry
      </Button>
    </div>
    <div
      v-for="storage of data"
      v-else
      :key="storage.id"
    >
      {{ storage.name }} - {{ storage.id }}
    </div>
  </PageContainer>
</template>
