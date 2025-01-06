<script setup lang="ts">
import { endpoints } from "~/lib/api/config/endpoints";
import { useApi } from "~/lib/api/useApi";
import StatefulDisplay from "~/components/Show/StatefulDisplay.vue";
import StorageCard from "../StorageCard.vue";
import AddButton from "../AddButton.vue";

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
    itemName="Depot"
  >
    <template #createNew>
      <AddButton to="/depot/create">
        Depot Erstellen
      </AddButton>
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
