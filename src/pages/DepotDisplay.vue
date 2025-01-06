<script lang="ts" setup>
import { Button, InputNumber } from "ant-design-vue";
import { ref, watch, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import CreateStorage from "~/components/Create/CreateStorage.vue";
import CreateSpace from "~/components/Create/CreateSpace.vue";
import CreateProduct from "~/components/Create/CreateProduct.vue";
import PageContainer from "~/components/PageContainer";
import { endpoints } from "~/lib/api/config/endpoints";
import { useApi } from "~/lib/api/useApi";
import StoragesViewGrid from "~/components/Show/StoragesViewGrid.vue";
import SpacesViewGrid from "~/components/Show/SpacesViewGrid.vue";
import ProductViewGrid from "~/components/Show/ProductViewGrid.vue";
import { notification } from "ant-design-vue";
import ApiForm from "~/components/Form/ApiForm.vue";
import FormInputNumber from "~/components/Form/FormInputNumber.vue";
import FormSelectableList from "~/components/Form/FormSelectableList.vue";

const route = useRoute();
const depotId = ref(route.params.id as string);

const showCreateStorage = ref(false);
const showCreateSpace = ref(false);
const showCreateProduct = ref(false);
const showStoredProducts = ref(false);
const { data: products, refetch: refetchProducts } = useApi(endpoints.getProducts, {
  params: {},
});

const { data: storage, errors, loading, aborted, refetch } = useApi(endpoints.getStorage, {
  params: {
    id: depotId.value,
  },
});

const reactiveStorages = computed(() => storage.value);

const availableSpaces = computed(() =>
  reactiveStorages.value?.spaces.filter((space: any) => space.currentSize < space.totalSize) ?? []);

function openProductSpaceModal() {
  showStoredProducts.value = !showStoredProducts.value;
}

onMounted(() => {
  showCreateStorage.value = false;
  showCreateSpace.value = false;
  showCreateProduct.value = false;
});

watch(
  () => route.params.id,
  (newId) => {
    if (typeof newId === "string") {
      depotId.value = newId;
      refetch();
      refetchProducts();
    }
  },
);

function toggleCreateStorage() {
  if (showCreateSpace.value || showCreateProduct.value) {
    showCreateSpace.value = false;
    showCreateProduct.value = false;
  }
  showCreateStorage.value = !showCreateStorage.value;
}

function toggleCreateSpace() {
  if (showCreateStorage.value || showCreateProduct.value) {
    showCreateStorage.value = false;
    showCreateProduct.value = false;
  }
  showCreateSpace.value = !showCreateSpace.value;
}

function toggleCreateProduct() {
  if (showCreateStorage.value || showCreateSpace.value) {
    showCreateStorage.value = false;
    showCreateSpace.value = false;
  }
  showCreateProduct.value = !showCreateProduct.value;
}

function triggerUpdate() {
  showCreateStorage.value = false;
  showCreateSpace.value = false;
  showCreateProduct.value = false;
  showStoredProducts.value = false;
  refetch();
  refetchProducts();
}
function handleSuccess(data: any) {
  notification.success({
    message: "Erfolg",
    description: `Produkt erfolgreich zugewiesen: ${data.productName}`,
    duration: 3,
  });
  showStoredProducts.value = false;
  triggerUpdate();
}

function handleFailure(errors: any) {
  notification.error({
    message: "Fehler",
    description: "Das Produkt konnte nicht zugewiesen werden.",
    duration: 3,
  });
  console.error(errors);
}
</script>

<template>
  <PageContainer>
    <div>
      <h1>Infos</h1>
      <div v-if="loading">
        Lädt...
      </div>
      <div v-else-if="errors && errors.length > 0">
        <p>
          <strong>Fehler beim Laden des Depots:</strong>
        </p>
        <ul>
          <li v-for="(error, index) in errors" :key="index">{{ error.message }}</li>
        </ul>
      </div>
      <div v-else-if="aborted">
        <p>Der Ladevorgang wurde abgebrochen. Bitte versuchen Sie es erneut.</p>
      </div>
      <div v-else-if="storage">
        <p>
          <strong>Name:</strong> {{ storage.name }}
        </p>
        <p>
          <strong>Beschreibung:</strong> {{ storage.description }}
        </p>
      </div>
      <div v-else>
        <p>Depot nicht gefunden oder Fehler beim Laden der Daten...</p>
      </div>
    </div>
    <div class="button-container">
      <Button htmlType="submit" type="primary" @click="toggleCreateStorage">
        Add storage
      </Button>
      <Button htmlType="submit" type="primary" @click="toggleCreateSpace">
        Add space
      </Button>
      <Button htmlType="submit" type="primary" @click="toggleCreateProduct">
        Add product
      </Button>
      <Button htmlType="submit" type="primary" @click="openProductSpaceModal">Assign Product to Space</Button>
    </div>
    <div>
      <ApiForm v-if="showStoredProducts" :endpoint="endpoints.postStoredProducts"
        :initialState="{ productId: '', spaceId: '', quantity: 1 }" @success="handleSuccess" @failure="handleFailure">
        <div class="layout-horizontal">
          <!-- Produktauswahl -->
          <div class="layout-vertical">
            <Divider orientation="left">
              Select Product
            </Divider>
            <FormSelectableList for="productId">
              <template #default="{ onSelect, selectedId }">
                <ul class="selectable-list">
                  <li v-for="product in products" :key="product.id" @click="onSelect(product.id)"
                    :class="{ selected: selectedId === product.id }">
                    <strong>{{ product.name }}</strong> - {{ product.size }} {{ product.unit }}
                  </li>
                </ul>
              </template>
            </FormSelectableList>
          </div>

          <!-- Space-Auswahl -->
          <div class="layout-vertical">
            <Divider orientation="left">
              Select Space
            </Divider>
            <FormSelectableList for="spaceId">
              <template #default="{ onSelect, selectedId }">
                <ul class="selectable-list">
                  <li v-for="space in availableSpaces" :key="space.id" @click="onSelect(space.id)"
                    :class="{ selected: selectedId === space.id }">
                    <strong>{{ space.name }}</strong> - Frei: {{ space.freeSize }} {{ space.unit }}
                  </li>
                </ul>
              </template>
            </FormSelectableList>
          </div>
        </div>

        <Divider>
          Enter Quantity:
        </Divider>
        <FormInputNumber for="quantity" placeholder="Enter quantity" />

        <Button htmlType="submit" type="primary" style="margin-top: 10px">
          Assign Product
        </Button>
      </ApiForm>
    </div>
    <CreateStorage v-if="showCreateStorage" :parentId="storage?.id" @close="toggleCreateStorage"
      @triggerUpdate="triggerUpdate" />
    <CreateSpace v-if="showCreateSpace" :storageId="storage?.id" @close="toggleCreateSpace"
      @triggerUpdate="triggerUpdate" />
    <CreateProduct v-if="showCreateProduct" :spaceId="storage?.id" @close="toggleCreateProduct"
      @triggerUpdate="triggerUpdate" />

    <StoragesViewGrid :storages="reactiveStorages?.subStorages ?? []" />
    <SpacesViewGrid :spaces="reactiveStorages?.spaces ?? []" />
    <ProductViewGrid :products="products ?? []" />
  </PageContainer>
</template>

<style scoped>
.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  /* Abstand zwischen Buttons */
  margin-top: 20px;
}

button {
  margin: 10px;
}

.layout-horizontal {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  gap: 20px;
  margin-top: 20px;
}

/* Vertical Layout */
.layout-vertical {
  width: 45%;
}

/* Selectable List Styling */
.selectable-list {
  list-style: none;
  color: black;
  padding: 0;
}

.selectable-list li {
  cursor: pointer;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 10px;
  background-color: #f9f9f9;
  transition: background-color 0.3s, transform 0.3s;
}

.selectable-list li:hover {
  background-color: #e6f7ff;
  transform: scale(1.02);
}

.selectable-list li.selected {
  background-color: #1890ff;
}
</style>