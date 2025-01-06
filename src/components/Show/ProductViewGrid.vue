<script lang="ts" setup>
import { Card, List, ListItem, Modal } from "ant-design-vue";
import { ref, computed, watch } from "vue";
import { z } from "zod";
import { ProductArray } from "~/lib/api/config/endpoints";
import { useApi } from "~/lib/api/useApi";
import { endpoints } from "~/lib/api/config/endpoints";
import { notification } from "ant-design-vue";

// Typ aus dem Zod-Schema ableiten
type ProductType = z.infer<typeof ProductArray>[number];

const props = defineProps<{
  products: ProductType[];
}>();

const localProducts = ref([...props.products]);

const selectedProduct = ref<ProductType | null>(null);

watch(
  () => props.products,
  (newValue) => {
    localProducts.value = [...newValue];
  },
);

const dataItems = computed(() => localProducts.value);

const isModalVisible = ref(false);

const showDetails = (product: ProductType) => {
  selectedProduct.value = product;
  isModalVisible.value = true;
};

const deleting = ref(false);
const handleDelete = async (id: string) => {
  const confirmDelete = confirm("Möchten Sie dieses Produkt wirklich löschen?");
  if (confirmDelete) {
    const { data, errors, loading } = useApi(endpoints.deleteProduct, { params: { id } });

    watch(
      () => loading.value,
      (isLoading) => {
        deleting.value = isLoading;
        if (isLoading) {
          notification.info({
            message: "Löschen...",
            description: "The product is deleted.",
            duration: 2,
          });
        }
      },
    );

    watch(
      () => data.value,
      (result) => {
        if (result) {
          console.log(`Produkt ${id} wurde gelöscht.`);
          localProducts.value = localProducts.value.filter((tempProduct: any) => tempProduct.id !== id);
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
          console.error("Fehler beim Löschen des Produkts:", err);
          notification.error({
            message: "Fehler",
            description: "The product could not be deleted.",
            duration: 3,
          });
        }
      }
    );
  }
};

</script>

<template>
  <div>
    <h2>Produkte</h2>

    <List :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }" :data-source="dataItems"
      style="border: 3px solid #f0f0f0; border-radius: 8px;">
      <template #renderItem="{ item }">
        <ListItem>
          <Card :style="{
            marginTop: '10px',
            cursor: 'pointer',
            border: '2px solid #ccc',
            borderRadius: '8px',
            transition: 'transform 0.2s'
          }" hoverable @click="showDetails(item)">
            <div class="card-header">
              <span>{{ item.name }}</span>
              <span class="delete-icon" @click.stop="handleDelete(item.id)">{{ deleting ? "Löschen..." : "✕" }}</span>
            </div>
            <div class="card-content">
              <div>
                <strong>Größe:</strong> {{ item.size }} {{ item.unit }}
              </div>
              <div>
                <strong>Beschreibung:</strong> {{ item.description }}
              </div>
            </div>
          </Card>
        </ListItem>
      </template>
    </List>

    <!-- Modal für Details -->
    <Modal v-model:visible="isModalVisible" title="Produktdetails" :footer="null">
      <p><strong>Name:</strong> {{ selectedProduct?.name }}</p>
      <p><strong>Größe:</strong> {{ selectedProduct?.size }} </p>
      <p><strong>Einheit:</strong> {{ selectedProduct?.unit }}</p>
      <p><strong>Beschreibung:</strong> {{ selectedProduct?.description }}</p>
      <p><strong>Attribute:</strong> {{ selectedProduct?.attributes }}</p>
      <p><strong>Erstellt am:</strong> {{ selectedProduct?.createdAt }}</p>
      <p><strong>Zuletzt aktualisiert:</strong> {{ selectedProduct?.updatedAt || 'N/A' }}</p>
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
