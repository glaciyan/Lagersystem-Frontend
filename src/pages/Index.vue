<script setup lang="ts">
import PageContainer from "~/components/PageContainer";
import GButton from "~/components/Button/BaseButton.vue";
import CreateDepot from "~/components/LSy/CreateDepot.vue";
import DepotsViewGrid from "~/components/LSy/DepotsViewGrid.vue";

import { ref, onMounted } from "vue";
import { useStorageStore } from "~/stores/storageStore.ts";

const showCreateDepot = ref(false);
const storageStore = useStorageStore();

onMounted(() => {
  storageStore.fetchStorages();
});

const toggleCreateDepot = () => {
  showCreateDepot.value = true; // Setzt die Sichtbarkeit auf true
};
const closeCreateDepot = () => {
  showCreateDepot.value = false; // Schließen
};
watch(showCreateDepot, (newValue) => {
  if (!newValue) {
    storageStore.refreshStorages(); // Aktualisiere, wenn das Modal geschlossen wird
  }
});
</script>

<template>
  <PageContainer>
    <!-- Button zum Öffnen -->
    <GButton
      label="Create Depot"
      @click="toggleCreateDepot"
    />

    <!-- Bedingte Anzeige des CreateDepot-Elements -->
    <CreateDepot
      v-if="showCreateDepot"
      placeholder="Please enter your depot name"
      @close="closeCreateDepot"
    />
  </PageContainer>
  <DepotsViewGrid :depots="storageStore.storages" />

  <!-- <DepotsViewGrid :titles="storageStore.storages.map(storage => storage.name)" /> -->
  <p v-if="storageStore.isLoading">
    Lädt...
  </p>
  <p
    v-if="storageStore.error"
    class="error"
  >
    {{ storageStore.error }}
  </p>
</template>

<style scoped>
.error {
  color: red;
  margin-top: 10px;
}
</style>
