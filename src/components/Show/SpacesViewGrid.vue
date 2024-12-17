<script lang="ts" setup>
import { Card, List, ListItem, Modal } from "ant-design-vue";
import { ref } from "vue";
import { z } from "zod";
import { Space } from "~/lib/api/config/endpoints";

// Typ aus dem Zod-Schema ableiten
type SpaceType = z.infer<typeof Space>;

defineProps<{
  spaces: SpaceType[];
}>();

const selectedSpace = ref<SpaceType | null>(null);

const isModalVisible = ref(false);

const showDetails = (space: SpaceType) => {
  selectedSpace.value = space;
  isModalVisible.value = true;
};

const handleDelete = async (id: string) => {
  const confirmDelete = confirm("Möchten Sie diesen Space wirklich löschen?");
  if (confirmDelete) {
    console.log(`Space mit ID ${id} gelöscht.`);
  }
};
</script>

<template>
  <div>
    <h2>Spaces</h2>

    <List
      :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }"
      :data-source="spaces"
      style="border: 3px solid #f0f0f0; border-radius: 8px;"
    >
      <template #renderItem="{ item }">
        <ListItem>
          <Card
            style="margin-top: 10px; cursor: pointer; border: 2px solid #ccc; border-radius: 8px; transition: transform 0.2s;"
            hoverable
            @click="showDetails(item)"
          >
            <div class="card-header">
              <span>{{ item.name }}</span>
              <span
                class="delete-icon"
                @click.stop="handleDelete(item.id)"
              >✕</span>
            </div>
            <div class="card-content">
              <div>
                <strong>Größe:</strong> {{ item.size }} m²
              </div>
              <div>
                <strong>Produkte:</strong> {{ item.products.length }}
              </div>
            </div>
          </Card>
        </ListItem>
      </template>
    </List>

    <!-- Modal für Details -->
    <Modal
      v-model:visible="isModalVisible"
      title="Space Details"
      :footer="null"
    >
      <p><strong>Name:</strong> {{ selectedSpace?.name }}</p>
      <p><strong>Größe:</strong> {{ selectedSpace?.size }} m²</p>
      <p><strong>Beschreibung:</strong> {{ selectedSpace?.description }}</p>
      <p><strong>Produkte:</strong> {{ selectedSpace?.products.length }}</p>
      <p><strong>Storage ID:</strong> {{ selectedSpace?.storageId }}</p>
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
