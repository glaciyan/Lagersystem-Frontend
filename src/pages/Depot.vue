<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStorageStore } from "~/stores/storageStore.ts";

const route = useRoute();
const depotId = ref(route.params.id as string); 

const storageStore = useStorageStore();

const depot = computed(() => storageStore.storages.find(item => item.id === depotId.value));

onMounted(async () => {
  if (!depot.value) {
    await storageStore.fetchStorages(); 
});
</script>

<template>
  <div>
    <h1>Depot Details</h1>
    <p v-if="depot">
      <strong>Name:</strong> {{ depot.name }}
    </p>
    <p v-if="depot">
      <strong>Beschreibung:</strong> {{ depot.description }}
    </p>
    <p v-else>
      Lädt oder Depot nicht gefunden...
    </p>
  </div>
</template>
