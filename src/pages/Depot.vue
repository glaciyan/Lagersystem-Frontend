<script lang="ts" setup>
import { Button } from "ant-design-vue";
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import CreateStorage from "~/components/LSy/CreateStorage.vue";
import PageContainer from "~/components/PageContainer";
import { endpoints } from "~/lib/api/config/endpoints";
import { useApi } from "~/lib/api/useApi";
import { useDepotState } from "~/stores/DepotState";

const storageStore = useDepotState();

const route = useRoute();
const depotId = ref(route.params.id as string); // ID aus der Route

onMounted(() => {
  storageStore.showCreateStorage = false;
});

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
  <PageContainer>
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
    <Button
      htmlType="submit"
      type="primary"
      @click="storageStore.toggleCreateStorage"
    >
      Add storage
    </Button>
    <CreateStorage
      v-if="storageStore.showCreateStorage"
      :parentID="storage?.id"
      @close="storageStore.toggleCreateStorage"
    />
  </PageContainer>
</template>
