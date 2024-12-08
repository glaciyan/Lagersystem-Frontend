<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { endpoints } from "~/lib/api/config/endpoints";
import { useApi } from "~/lib/api/useApi";

const route = useRoute();
const depotId = ref(route.params.id as string); // ID aus der Route

const { data: storage, errors, loading, refetch } = useApi(endpoints.getStorage, {
  params: {
    id: depotId.value,
  },
});

watch(
  () => route.params.id,
  (newId) => {
    depotId.value = newId; // Depot-ID aktualisieren
    refetch(); // API erneut abrufen
  },
);

onMounted(() => {
  console.log("Depot wird geladen...");
});
</script>

<template>
  <div>
    <h1>Depot Details</h1>
    <div v-if="loading">
      Lädt...
    </div>
    <div v-else-if="storage">
      <p>
        <strong>Name:</strong> {{ storage.name }}
      </p>
      <p>
        <strong>Beschreibung:</strong> {{ storage.description }}
      </p>
    </div>
    <div v-else>
      <p>Depot nicht gefunden oder Fehler beim Laden der Daten...</p>
    </div>
  </div>
</template>
