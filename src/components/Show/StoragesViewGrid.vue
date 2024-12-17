<script lang="ts" setup>
import { Card, List, ListItem } from "ant-design-vue";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useApi } from "~/lib/api/useApi";
import { endpoints } from "~/lib/api/config/endpoints";
import { z } from "zod";
import { StorageArray } from "~/lib/api/config/endpoints";

type StorageType = z.infer<typeof StorageArray>[number];

const props = defineProps<{
  storages: StorageType[];
}>();

const router = useRouter();

const dataItems = computed(() => props.storages);

const navigateToStorage = (id: string) => {
  console.log("Navigating to storage", id);
  router.push(`/storage/${id}`);
};

const emit = defineEmits(["triggerUpdate"]);
function triggerUpdate() {
  emit("triggerUpdate");
}
const handleDelete = async (id: string) => {
  const confirmDelete = confirm("Möchten Sie dieses Depot wirklich löschen?");
  if (confirmDelete) {
    try {
      await useApi(endpoints.deleteStorage, { params: { id } });
      console.log(`Storage ${id} wurde gelöscht.`);
      triggerUpdate();
    }
    catch (error) {
      console.error("Fehler beim Löschen des Depots:", error);
    }
  }
};

</script>

<template>
  <div>
    <h2>Storages</h2>

    <List
      :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }"
      :data-source="dataItems"
      style="border: 3px solid #f0f0f0; border-radius: 8px;"
    >
      <template #renderItem="{ item }">
        <ListItem>
          <Card
            style="margin-top: 10px; cursor: pointer; border: 2px solid #ccc; border-radius: 8px;"
            @click="navigateToStorage(item.id)"
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
          </Card>
        </ListItem>
      </template>
    </List>
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
