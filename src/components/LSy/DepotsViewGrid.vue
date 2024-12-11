<script lang="ts" setup>
import { r } from "node_modules/@storybook/vue3/dist/render-0377a2e9";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useIndexState } from "~/stores/IndexState.ts";

const indexStore = useIndexState();

const props = defineProps<{
  depots: { id: string; name: string; description: string; spaces: any[]; subStorages: any[] }[];
}>();

const router = useRouter();

// Computed-Eigenschaft direkt aus den Props
const dataItems = computed(() => props.depots);

const navigateToDepot = async (id: string) => {
  await router.push(`/depot/${id}`);
  // router.go(0);
};

const handleDelete = async (id: string) => {
  const confirmDelete = confirm("Möchten Sie dieses Depot wirklich löschen?");
  if (confirmDelete) {
    props.depots.splice(props.depots.findIndex(depot => depot.id === id), 1);
    await indexStore.deleteStorage(id);
  }
};
</script>

<template>
  <div>
    <h2>Depots</h2>

    <a-list
      :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }"
      :data-source="dataItems"
      style="border: 3px solid #f0f0f0; border-radius: 8px;"
    >
      <template #renderItem="{ item }">
        <a-list-item>
          <a-card
            style="margin-top: 10px; cursor: pointer; border: 2px solid #ccc; border-radius: 8px;"
            @click="navigateToDepot(item.id)"
          >
            <div class="card-header">
              <span>{{ item.name }}</span>
              <span
                class="delete-icon"
                @click.stop="handleDelete(item.id)"
              >✕</span>
            </div>
            <div class="card-content">
              <p>{{ item.description }}</p>
            </div>
          </a-card>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<style scoped>
h2 {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 10px;
}

.delete-icon {
  color: red;
  cursor: pointer;
}

.delete-icon:hover {
  color: darkred;
}

.card-content {
  font-size: 10px;
}
</style>
