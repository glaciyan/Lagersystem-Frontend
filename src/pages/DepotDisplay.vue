<script lang="ts" setup>
import { Button } from "ant-design-vue";
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

const route = useRoute();
const depotId = ref(route.params.id as string);

const showCreateStorage = ref(false);
const showCreateSpace = ref(false);
const showCreateProduct = ref(false);

onMounted(() => {
  showCreateStorage.value = false;
  showCreateSpace.value = false;
  showCreateProduct.value = false;
});

const { data: storage, errors, loading, aborted, refetch } = useApi(endpoints.getStorage, {
  params: {
    id: depotId.value,
  },
});

const reactiveStorages = computed(() => storage.value);

const { data: products, refetch: refetchProducts } = useApi(endpoints.getProducts, {
  params: {},
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
  refetch();
  refetchProducts();
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
</style>
