<script lang="ts" setup>
import PageContainer from "~/components/PageContainer";
import { endpoints } from "~/lib/api/config/endpoints";
import { useApi } from "~/lib/api/useApi";
import SubStoragesViewGrid from "~/components/ViewGrid/SubStoragesViewGrid.vue";
import SpacesViewGrid from "~/components/ViewGrid/SpacesViewGrid.vue";
import ProductViewGrid from "~/components/ViewGrid/ProductViewGrid.vue";
import LayoutVertical from "~/components/LayoutVertical.vue";
import { Button } from "ant-design-vue";
import { RouterLink } from "vue-router";
import ReturnIcon from "~/icons/ReturnIcon.vue";

const route = useRoute();
const depotId = ref(route.params.id as string);
const input = reactive({
  params: {
    id: route.params.id as string,
  },
});

// const showCreateStorage = ref(false);
// const showCreateSpace = ref(false);
// const showCreateProduct = ref(false);

// onMounted(() => {
//   showCreateStorage.value = false;
//   showCreateSpace.value = false;
//   showCreateProduct.value = false;
// });

const { data, errors, aborted, loading, refetch } = useApi(endpoints.getStorage, input);

const { data: products, refetch: refetchProducts, errors: productErrors, loading: productsLoading, aborted: productsAborted } = useApi(endpoints.getProducts, {
  params: {},
});

watch(
  () => route.params.id,
  (newId) => {
    if (typeof newId === "string") {
      input.params.id = newId;
      depotId.value = newId;
      // refetch(); // no need to refetch, input is reactive now
      refetchProducts();
    }
  },
);

// function toggleCreateStorage() {
//   if (showCreateSpace.value || showCreateProduct.value) {
//     showCreateSpace.value = false;
//     showCreateProduct.value = false;
//   }
//   showCreateStorage.value = !showCreateStorage.value;
// }

// function toggleCreateSpace() {
//   if (showCreateStorage.value || showCreateProduct.value) {
//     showCreateStorage.value = false;
//     showCreateProduct.value = false;
//   }
//   showCreateSpace.value = !showCreateSpace.value;
// }

// function toggleCreateProduct() {
//   if (showCreateStorage.value || showCreateSpace.value) {
//     showCreateStorage.value = false;
//     showCreateSpace.value = false;
//   }
//   showCreateProduct.value = !showCreateProduct.value;
// }

// function triggerUpdate() {
//   showCreateStorage.value = false;
//   showCreateSpace.value = false;
//   showCreateProduct.value = false;
//   refetch();
//   refetchProducts();
// }
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
          <li
            v-for="(error, index) in errors"
            :key="index"
          >
            {{ error.message }}
          </li>
        </ul>
      </div>
      <div v-else-if="aborted">
        <p>Der Ladevorgang wurde abgebrochen. Bitte versuchen Sie es erneut.</p>
      </div>
      <div v-else-if="data">
        <p>
          <strong>Name:</strong> {{ data.name }}
        </p>
        <p>
          <strong>Beschreibung:</strong> {{ data.description }}
        </p>
      </div>
      <div v-else>
        <p>Depot nicht gefunden oder Fehler beim Laden der Daten...</p>
      </div>
    </div>
    <RouterLink
      v-if="data && data.parentId"
      :to="`/depot/${data!.parentId}`"
    >
      <Button class="!mx-0">
        <div class="flex flex-wrap items-center justify-center gap-2">
          <ReturnIcon />
          Zurück zum Parent
        </div>
      </Button>
    </RouterLink>
    <!-- <div class="button-container">
      <Button
        htmlType="submit"
        type="primary"
        @click="toggleCreateStorage"
      >
        Add storage
      </Button>
      <Button
        htmlType="submit"
        type="primary"
        @click="toggleCreateSpace"
      >
        Add space
      </Button>
      <Button
        htmlType="submit"
        type="primary"
        @click="toggleCreateProduct"
      >
        Add product
      </Button>
    </div> -->
    <!-- <CreateStorage
      v-if="showCreateStorage"
      :parentId="storage?.id"
      @close="toggleCreateStorage"
      @triggerUpdate="triggerUpdate"
    />
    <CreateSpace
      v-if="showCreateSpace"
      :storageId="storage?.id"
      @close="toggleCreateSpace"
      @triggerUpdate="triggerUpdate"
    />
    <CreateProduct
      v-if="showCreateProduct"
      :spaceId="storage?.id"
      @close="toggleCreateProduct"
      @triggerUpdate="triggerUpdate"
    /> -->

    <LayoutVertical gap="large">
      <SubStoragesViewGrid
        :data
        :errors
        :loading
        :aborted
        :refetch
        :parentId="depotId"
        @update="refetch"
      />
      <SpacesViewGrid
        :data
        :errors
        :loading
        :aborted
        :refetch
        :parentId="depotId"
        @update="refetch"
      />
      <ProductViewGrid
        :data="products"
        :errors="productErrors"
        :loading="productsLoading"
        :refetch="refetchProducts"
        :aborted="productsAborted"
        :originStorageId="depotId"
        @update="refetchProducts"
      />
    </LayoutVertical>
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
