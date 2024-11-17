<script lang="ts" setup>
import { defineProps, computed } from "vue";
import { useRouter } from "vue-router";
import { useStorageStore } from "~/stores/storageStore.ts";
import { defineStore } from "pinia";

// Props: Array von Depots
const props = defineProps<{
  depots: { id: string; name: string }[];
}>();

const router = useRouter();
const storageStore = useStorageStore();

// Computed-Wert für die Liste
const dataItems = computed(() => props.depots);

// Navigiere zur Depot-Seite
const navigateToDepot = (id: string) => {
  router.push(`/depot/${id}`);
};

// Lösche ein Depot
const deleteDepot = async (id: string) => {
  const confirmDelete = confirm("Möchten Sie dieses Depot wirklich löschen?");
  if (confirmDelete) {
    await storageStore.deleteStorage(id);
  }
};
</script>
<template>
  <a-list
    :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }"
    :data-source="dataItems"
    bordered
  >
    <template #renderItem="{ item }">
      <a-list-item @click="navigateToDepot(item.id)">
        <a-card style="cursor: pointer;">
          <div
            class="card-header"
          >
            <!-- Name des Depots -->

            <span>
              {{ item.name }}
            </span>
            <!-- Rotes X-Symbol -->
            <span
              class="delete-icon"
              @click.stop="deleteDepot(item.id)"
            >
              ✕
            </span>
          </div>
          <div>
            Card content Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic accusamus, adipisci nihil, natus quidem optio id, sit doloremque maiores expedita repellat perspiciatis. Laborum dolorem vero quis commodi. Soluta, deleniti sunt!
          </div>
        </a-card>
      </a-list-item>
    </template>
  </a-list>
</template>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.delete-icon {
  color: red;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  margin-left: 8px;
}

.delete-icon:hover {
  color: darkred; /* Optional: Hover-Effekt */
}
</style>
