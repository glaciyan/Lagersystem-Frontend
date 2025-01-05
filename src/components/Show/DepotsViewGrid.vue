<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { z } from "zod";
import { useRouter } from "vue-router";
import { useApi } from "~/lib/api/useApi";
import { endpoints } from "~/lib/api/config/endpoints";
import { StorageArray } from "~/lib/api/config/endpoints";
import { notification } from "ant-design-vue";

type StorageType = z.infer<typeof StorageArray>[number];

const props = defineProps<{
  depots: StorageType[];
}>();

const router = useRouter();

const localDepots = ref([...props.depots]);
watch(
  () => props.depots,
  (newValue) => {
    localDepots.value = [...newValue];
    console.log("DepotsViewGrid: props.depots changed:", newValue);
  },
);
const dataItems = computed(() => localDepots.value);

const navigateToDepot = (id: string) => {
  console.log(`Navigiere zu Depot ${id}`);
  router.push(`/depot/${id}`);
};

const deleting = ref(false);
const handleDelete = async (id: string) => {
  const confirmDelete = confirm("Möchten Sie dieses Depot wirklich löschen?");
  if (confirmDelete) {
    const { data, errors, loading } = useApi(endpoints.deleteStorage, { params: { id } });

    watch(
      () => loading.value,
      (isLoading) => {
        deleting.value = isLoading;
        if (isLoading) {
          notification.info({
            message: "Löschen...",
            description: "Das Depot wird gelöscht.",
            duration: 2,
          });
        }
      },
    );

    watch(
      () => data.value,
      (result) => {
        if (result) {
          console.log(`Depot ${id} wurde gelöscht.`);
          localDepots.value = localDepots.value.filter((storage: any) => storage.id !== id);
          notification.success({
            message: "Erfolg",
            description: `Depot ${id} wurde erfolgreich gelöscht!`,
            duration: 3,
          });
        }
      },
    );

    watch(
      () => errors.value,
      (err) => {
        if (err) {
          console.error("Fehler beim Löschen des Depots:", err);
          notification.error({
            message: "Fehler",
            description: "Das Depot konnte nicht gelöscht werden.",
            duration: 3,
          });
        }
      },
    );
  }
};
</script>

<template>
  <div>
    <h2>Depots</h2>
    <div class="depot-list">
      <!-- Dynamisches Rendering der Depots ohne Card-Komponente -->
      <div v-for="depot in dataItems" :key="depot.id" class="depot-item">
        <div>
          <p><strong>Name:</strong> {{ depot.name }}</p>
          <p><strong>Beschreibung:</strong> {{ depot.description }}</p>
        </div>
        <div class="depot-actions">
          <button @click="() => navigateToDepot(depot.id)">Edit</button>
          <button @click="() => handleDelete(depot.id)">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
h2 {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}

.depot-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
}

.depot-item {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  width: 300px;
  text-align: left;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.depot-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
