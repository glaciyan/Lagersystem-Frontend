<script setup lang="ts">
import { endpoints } from "~/lib/api/config/endpoints";
import { useApi } from "~/lib/api/useApi";
import StatefulDisplay from "~/components/ViewGrid/StatefulDisplay.vue";
import StorageCard from "../ItemCard/StorageCard.vue";
import AddButton from "../Buttons/AddButton.vue";
import ViewGridHeader from "./ViewGridHeader.vue";

const { data, errors, loading, aborted, refetch } = useApi(endpoints.getStorages, {});
</script>

<template>
  <StatefulDisplay
    :data
    :errors
    :loading
    :aborted
    :refetch
    emptyText="Keine Depots vorhanden"
  >
    <template #header>
      <ViewGridHeader
        header="Depots"
        :refetch="refetch"
      >
        <AddButton to="/depot/create">
          Depot Erstellen
        </AddButton>
      </ViewGridHeader>
    </template>

    <template #display>
      <!-- <DepotsViewGrid :depots="data ?? []" /> -->
      <div class="grid grid-cols-1 mt-6 gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
        <StorageCard
          v-for="depot of data"
          :key="depot.id"
          :storage="depot"
          @update="refetch"
        />
      </div>
    </template>
  </StatefulDisplay>
</template>
