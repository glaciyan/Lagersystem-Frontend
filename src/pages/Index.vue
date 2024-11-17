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
  showCreateDepot.value = true;
};
const closeCreateDepot = () => {
  showCreateDepot.value = false;
};
watch(showCreateDepot, (newValue) => {
  if (!newValue) {
    storageStore.refreshStorages();
});
</script>

<template>
  <PageContainer>
    <GButton
      label="Create Depot"
      @click="toggleCreateDepot"
    />

    <CreateDepot
      v-if="showCreateDepot"
      placeholder="Please enter your depot name"
      @close="closeCreateDepot"
    />
  </PageContainer>
  <DepotsViewGrid :depots="storageStore.storages" />
</template>

<style scoped>
.error {
  color: red;
  margin-top: 10px;
}
</style>
