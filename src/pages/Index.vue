<script setup lang="ts">
import PageContainer from "~/components/PageContainer";
import { endpoints } from "~/lib/api/config/endpoints";
import { useApi } from "~/lib/api/useApi";
import StatefulDisplay from "~/components/Show/StatefulDisplay.vue";
import NewDepotButton from "~/components/NewDepotButton.vue";
import ReloadIcon from "~/icons/ReloadIcon.vue";
import { h } from "vue";
import DepotCard from "~/components/StorageCard.vue";
import { Button } from "ant-design-vue";

const { data, errors, loading, aborted, refetch } = useApi(endpoints.getStorages, {});
</script>

<template>
  <PageContainer>
    <StatefulDisplay
      :data
      :errors
      :loading
      :aborted
      :refetch
    >
      <template #createNew>
        <NewDepotButton />
      </template>

      <template #display>
        <div class="flex flex-wrap content-center gap-6">
          <h1 class="m-0 text-xl">
            Depots
          </h1>
          <NewDepotButton />
          <Button
            :icon="h(ReloadIcon)"
            @click="refetch"
          >
            Neu Laden
          </Button>
        </div>
        <!-- <DepotsViewGrid :depots="data ?? []" /> -->
        <div class="grid grid-cols-1 mt-6 gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
          <DepotCard
            v-for="depot of data"
            :key="depot.id"
            :depot="depot"
            @update="refetch"
          />
        </div>
      </template>
    </StatefulDisplay>
  </PageContainer>
</template>
