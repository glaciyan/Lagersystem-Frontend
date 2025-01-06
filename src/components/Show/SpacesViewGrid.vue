<script lang="ts" setup>
import { Card, List, ListItem, Modal } from "ant-design-vue";
import { ref, computed, watch } from "vue";
import { z } from "zod";
import { SpaceArray } from "~/lib/api/config/endpoints";
import { useApi } from "~/lib/api/useApi";
import { endpoints } from "~/lib/api/config/endpoints";
import { notification } from "ant-design-vue";
import useItems from "ant-design-vue/es/menu/src/hooks/useItems";

type SpaceType = z.infer<typeof SpaceArray>[number];

const props = defineProps<{
  spaces: SpaceType[];
}>();

const localSpaces = ref([...props.spaces]);

const selectedSpace = ref<SpaceType | null>(null);

watch(
  () => props.spaces,
  (newValue) => {
    localSpaces.value = [...newValue];
  },
);

const dataItems = computed(() => localSpaces.value);

const isModalVisible = ref(false);

const showDetails = (space: SpaceType) => {
  selectedSpace.value = space;
  isModalVisible.value = true;
};

const deleting = ref(false);
const handleDelete = async (id: string) => {
  const confirmDelete = confirm("Möchten Sie diesen Space wirklich löschen?");
  if (confirmDelete) {
    const { data, errors, loading } = useApi(endpoints.deleteSpace, { params: { id } });

    watch(
      () => loading.value,
      (isLoading) => {
        deleting.value = isLoading;
        if (isLoading) {
          notification.info({
            message: "Löschen...",
            description: "The space is deleted.",
            duration: 2,
          });
        }
      },
    );

    watch(
      () => data.value,
      (result) => {
        if (result) {
          console.log(`Space ${id} wurde gelöscht.`);
          localSpaces.value = localSpaces.value.filter((tempSpace: any) => tempSpace.id !== id);
          notification.success({
            message: "Erfolg",
            description: `Space ${id} was successfully deleted!`,
            duration: 3,
          });
        }
      },
    );

    watch(
      () => errors.value,
      (err) => {
        if (err) {
          console.error("Fehler beim Löschen des Spaces:", err);
          notification.error({
            message: "Fehler",
            description: "The space could not be deleted.",
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
    <h2>Spaces</h2>

    <List
      :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }"
      :data-source="dataItems"
      style="border: 3px solid #f0f0f0; border-radius: 8px;"
    >
      <template #renderItem="{ item }">
        <ListItem>
          <Card
            :style="{
              marginTop: '10px',
              cursor: 'pointer',
              border: `2px solid ${item.currentSize < item.totalSize ? 'green' : 'red'}`,
              borderRadius: '8px',
              transition: 'transform 0.2s'
            }"
            hoverable
            @click="showDetails(item)"
          >
            <div class="card-header">
              <span>{{ item.name }}</span>
              <span
                class="delete-icon"
                @click.stop="handleDelete(item.id)"
              >{{ deleting ? "Löschen..." : "✕" }}</span>
            </div>
            <div class="card-content">
              <div>
                <strong>Größe:</strong> {{ item.totalSize }} {{ item.unit }}
              </div>
              <div>
                <strong>Aktuelle Größe:</strong> {{ item.currentSize }} {{ item.unit }}
              </div>
              <div v-if="item.products">
                <strong>Produkte:</strong> {{ item.products.length }}
              </div>
            </div>
          </Card>
        </ListItem>
      </template>
    </List>

    <Modal
      v-model:visible="isModalVisible"
      title="Space Details"
      :footer="null"
    >
      <p><strong>Name:</strong> {{ selectedSpace?.name }}</p>
      <p><strong>Unit:</strong> {{ selectedSpace?.unit }}</p>
      <p><strong>Size:</strong> {{ selectedSpace?.totalSize }} </p>
      <p><strong>Current size:</strong> {{ selectedSpace?.currentSize }} </p>
      <p><strong>Description:</strong> {{ selectedSpace?.description }}</p>
      <p><strong>Products:</strong> {{ selectedSpace?.products.length }}</p>
      <p><strong>Storage ID:</strong> {{ selectedSpace?.storageId }}</p>
      <p><strong>Created on:</strong> {{ selectedSpace?.createdAt }}</p>
      <p><strong>Last updated:</strong> {{ selectedSpace?.updatedAt || 'N/A' }}</p>
    </Modal>
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

a-card:hover {
  transform: scale(1.02);
  border-color: #007bff;
}
</style>
