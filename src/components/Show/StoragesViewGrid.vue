<script lang="ts" setup>
import { Card, List, ListItem } from "ant-design-vue";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useApi } from "~/lib/api/useApi";
import { endpoints } from "~/lib/api/config/endpoints";
import { z } from "zod";
import { StorageArray } from "~/lib/api/config/endpoints";
import { notification } from "ant-design-vue";

type StorageType = z.infer<typeof StorageArray>[number];

const props = defineProps<{
  storages: StorageType[];
}>();

const router = useRouter();

const localStorages = ref([...props.storages]);

watch(
  () => props.storages,
  (newValue) => {
    localStorages.value = [...newValue];
  },
);

const dataItems = computed(() => localStorages.value);

const navigateToStorage = async (id: string) => {
  console.log(`Navigiere zu Storage ${id}`);
  await router.push(`/depot/${id}`);
  window.location.reload();
};

const deleting = ref(false);

const handleDelete = async (id: string) => {
  const confirmDelete = confirm("Möchten Sie dieses Storage wirklich löschen?");
  if (confirmDelete) {
    const { data, errors, loading } = useApi(endpoints.deleteStorage, { params: { id } });

    watch(
      () => loading.value,
      (isLoading) => {
        deleting.value = isLoading;
        if (isLoading) {
          notification.info({
            message: "Löschen...",
            description: "The storage is being deleted.",
            duration: 2,
          });
        }
      },
    );

    watch(
      () => data.value,
      (result) => {
        if (result) {
          console.log(`Storage ${id} wurde gelöscht.`);
          localStorages.value = localStorages.value.filter((storage: any) => storage.id !== id);
          notification.success({
            message: "Erfolg",
            description: `Storage ${id} was successfully deleted!`,
            duration: 3,
          });
        }
      },
    );

    watch(
      () => errors.value,
      (err) => {
        if (err) {
          console.error("Fehler beim Löschen des Storage:", err);
          notification.error({
            message: "Fehler",
            description: "The storage could not be deleted.",
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
              > {{ deleting ? "Löschen..." : "✕" }}</span>
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
