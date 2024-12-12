<script lang="ts" setup>
import { defineProps, ref } from "vue";

defineProps<{
  storages: { id: string; name: string; size: number; description: string; products: any[]; storageId: string }[];
}>();

const selectedSpace = ref(null); // Ausgewählter Space für Details
const isModalVisible = ref(false); // Steuert die Sichtbarkeit des Modals

// TODO: use correct type
const showDetails = (space: any) => {
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

    <a-list
      :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }"
      :data-source="storages"
      style="border: 3px solid #f0f0f0; border-radius: 8px;"
    >
      <template #renderItem="{ item }">
        <a-list-item>
          <a-card
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
          </a-card>
        </a-list-item>
      </template>
    </a-list>

    <!-- Modal für Details -->
    <a-modal
      v-model:visible="isModalVisible"
      title="Space Details"
      :footer="null"
    >
      <p><strong>Name:</strong> {{ selectedSpace?.name }}</p>
      <p><strong>Größe:</strong> {{ selectedSpace?.size }} m²</p>
      <p><strong>Beschreibung:</strong> {{ selectedSpace?.description }}</p>
      <p><strong>Produkte:</strong> {{ selectedSpace?.products.length }}</p>
      <p><strong>Storage ID:</strong> {{ selectedSpace?.storageId }}</p>
    </a-modal>
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
  transform: scale(1.02); /* Vergrößert die Karte leicht beim Hovern */
  border-color: #007bff; /* Ändert die Rahmenfarbe beim Hovern */
}
</style>
