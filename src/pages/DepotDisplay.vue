<script lang="ts" setup>
import { Button } from "ant-design-vue";
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import CreateStorage from "~/components/LSy/CreateStorage.vue";
import CreateSpace from "~/components/LSy/CreateSpace.vue";
import PageContainer from "~/components/PageContainer";
import { endpoints } from "~/lib/api/config/endpoints";
import { useApi } from "~/lib/api/useApi";
import { useDepotState } from "~/stores/DepotState";
import StoragesViewGrid from "~/components/LSy/StoragesViewGrid.vue";
import SpacesViewGrid from "~/components/LSy/SpacesViewGrid.vue";

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

const { data: storages, errors: error2, loading: loading2, refetch2 } = useApi(endpoints.getStorage, {
  query: {
    depth: 1,
  },
  params: {
    id: depotId.value,
  },
});

watchEffect(() => {
  console.log("Storages:", storages.value);
  console.log("Error:", error2?.value);
  console.log("Loading:", loading2.value);
});

const reactiveStorages = computed(() => storages.value);

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
    <div class="button-container">
      <Button
        htmlType="submit"
        type="primary"
        @click="storageStore.toggleCreateStorage"
      >
        Add storage
      </Button>
      <Button
        htmlType="submit"
        type="primary"
        @click="storageStore.toggleCreateSpace"
      >
        Add space
      </Button>
    </div>
    <CreateStorage
      v-if="storageStore.showCreateStorage"
      :parentId="storage?.id"
      @close="storageStore.toggleCreateStorage"
    />
    <CreateSpace
      v-if="storageStore.showCreateSpace"
      :storageId="storage?.id"
      @close="storageStore.toggleCreateSpace"
    />
    <StoragesViewGrid
      :storages="reactiveStorages?.subStorages ?? []"
      @success="(data) => console.log(data)"
      @failure="(err) => console.log(err)"
    />
    <SpacesViewGrid
      :storages="reactiveStorages?.spaces ?? []"
      @success="(data) => console.log(data)"
      @failure="(err) => console.log(err)"
    />
  </PageContainer>
</template>

<style scoped>
.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0; /* Buttons berühren sich */
  margin-top: 20px;

}

button {
  margin: 10px;
  /* border-radius: 0; Optional: Verhindert abgerundete Ränder */
}
</style>

<!-- <script lang="ts" setup>
import { Button } from "ant-design-vue";
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import CreateStorage from "~/components/LSy/CreateStorage.vue";
import CreateSpace from "~/components/LSy/CreateSpace.vue";
import StoragesViewGrid from "~/components/LSy/StoragesViewGrid.vue";

import PageContainer from "~/components/PageContainer";
import { endpoints } from "~/lib/api/config/endpoints";
import { useApi } from "~/lib/api/useApi";
import { useDepotState } from "~/stores/DepotState";

const storageStore = useDepotState();

const route = useRoute();
const depotId = ref(route.params.id as string); // ID aus der Route

onMounted(() => {
  console.log("Depot wird geladen...");
  storageStore.showCreateStorage = false;
  storageStore.showCreateSpace = false;
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

watchEffect(() => {
  console.log("Depot:", storage.value);
  console.log("Error:", errors?.value);
  console.log("Loading:", loading.value);
});

// const reactiveStorages = computed(() => storages.value);

// const { data: storages, errors: error2, loading: loading2, refetch2 } = useApi(endpoints.getStorage, {
//   query: {
//     depth: 1,
//   },
//   params: {
//     id: depotId.value,
//   },
// });

// watchEffect(() => {
//   console.log("Storages:", storages.value);
//   console.log("Error:", error2?.value);
//   console.log("Loading:", loading2.value);
// });
// onMounted(() => {
//   console.log("Depot wird geladen...");
// });

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
    <div class="button-container">
      <Button
        htmlType="submit"
        type="primary"
        @click="storageStore.toggleCreateStorage"
      >
        Add storage
      </Button>
      <Button
        htmlType="submit"
        type="primary"
        @click="storageStore.toggleCreateSpace"
      >
        Add space
      </Button>
    </div>
    <CreateStorage
      v-if="storageStore.showCreateStorage"
      :parentId="storage?.id"
      @close="storageStore.toggleCreateStorage"
    />
    <CreateSpace
      v-if="storageStore.showCreateSpace"
      :storageId="storage?.id"
      @close="storageStore.toggleCreateSpace"
    />
  </PageContainer>
  <div>
    <StoragesViewGrid
      :storages="reactiveStorages ?? []"
      @success="(data) => console.log(data)"
      @failure="(err) => console.log(err)"
    />
  </div>
  <h2>Liste aller Depots</h2>
  <div v-if="loading">
    Daten werden geladen...
  </div>
  <div v-else-if="reactiveStorages.length === 0">
    Keine Depots verfügbar.
  </div>
  <table
    v-else
    border="1"
  >
    <thead>
      <tr>
        <th
          v-for="(key, index) in Object.keys(reactiveStorages[0])"
          :key="index"
        >
          {{ key }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(depot, index) in reactiveStorages"
        :key="index"
      >
        <td
          v-for="(value, key) in depot"
          :key="key"
        >
          {{ value }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

 -->
