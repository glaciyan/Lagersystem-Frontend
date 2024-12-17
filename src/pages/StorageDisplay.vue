<script lang="ts" setup>
import { Button } from "ant-design-vue";
import { ref, watch, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import CreateStorage from "~/components/Create/CreateStorage.vue";
import CreateSpace from "~/components/Create/CreateSpace.vue";
import PageContainer from "~/components/PageContainer";
import { endpoints } from "~/lib/api/config/endpoints";
import { useApi } from "~/lib/api/useApi";
import StoragesViewGrid from "~/components/Show/StoragesViewGrid.vue";
import SpacesViewGrid from "~/components/Show/SpacesViewGrid.vue";

const route = useRoute();
const depotId = ref(route.params.id as string); // ID aus der Route

const showCreateStorage = ref(false);
const showCreateSpace = ref(false);

onMounted(() => {
  showCreateStorage.value = false;
  showCreateSpace.value = false;
});

const { data: storage, loading, refetch } = useApi(endpoints.getStorage, {
  params: {
    id: depotId.value,
  },
});

const reactiveStorages = computed(() => storage.value);

watch(
  () => route.params.id,
  (newId) => {
    if (typeof newId === "string") {
      depotId.value = newId;
      refetch();
    }
  },
);

function toggleCreateStorage() {
  if (showCreateSpace.value) {
    showCreateSpace.value = false;
  }
  showCreateStorage.value = !showCreateStorage.value;
}

function toggleCreateSpace() {
  if (showCreateStorage.value) {
    showCreateStorage.value = false;
  }
  showCreateSpace.value = !showCreateSpace.value;
}

function triggerUpdate() {
  showCreateStorage.value = false;
  showCreateSpace.value = false;
  refetch();
}
</script>

<template>
  <PageContainer>
    <div>
      <h1>Storage Details</h1>
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
        <p>
          <strong>ID:</strong> {{ storage.id }}
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
        @click="toggleCreateStorage"
      >
        Add storage
      </Button>
      <Button
        htmlType="submit"
        type="primary"
        @click="toggleCreateSpace"
      >
        Add space
      </Button>
    </div>
    <CreateStorage
      v-if="showCreateStorage"
      :parentId="storage?.id"
      @close="toggleCreateStorage"
      @triggerUpdate="triggerUpdate"
    />
    <CreateSpace
      v-if="showCreateSpace"
      :storageId="storage?.id"
      @close="toggleCreateSpace"
      @triggerUpdate="triggerUpdate"
    />
    <StoragesViewGrid
      :storages="reactiveStorages?.subStorages ?? []"
      @success="triggerUpdate"
      @failure="(err) => console.log(err)"
      @triggerUpdate="triggerUpdate"
    />
    <SpacesViewGrid
      :storages="reactiveStorages?.spaces ?? []"
      @success="triggerUpdate"
      @failure="(err) => console.log(err)"
      @delete="triggerUpdate"
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
