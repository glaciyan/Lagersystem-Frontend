<script setup lang="ts">
import GButton from "~/components/Button/BaseButton.vue";
import PageContainer from "~/components/PageContainer";
import { endpoints } from "~/lib/api/config/endpoints";
import { useApi } from "~/lib/api/useApi";

const { data, errors, loading } = useApi(endpoints.getStorages, {});
</script>

<template>
  <div v-if="loading">
    <p>Loading...</p>
  </div>
  <div v-else>
    <p v-if="errors !== null">
      Something went wrong!
    </p>
    <p
      v-for="storage of data"
      v-else
      :key="storage.id"
    >
      {{ storage.name }} - {{ storage.id }}
    </p>
  </div>
  <PageContainer>
    <GButton
      label="hello"
    />
    <GButton
      label="Hello Loading"
      loadingPosition="left"
    />
  </PageContainer>
</template>
