<script lang="ts" setup>
import PageContainer from "~/components/PageContainer";
import { endpoints } from "~/lib/api/config/endpoints";
import { useApi } from "~/lib/api/useApi";
import SubStoragesViewGrid from "~/components/Show/SubStoragesViewGrid.vue";
import SpacesViewGrid from "~/components/Show/SpacesViewGrid.vue";
import ProductViewGrid from "~/components/Show/ProductViewGrid.vue";
import LayoutVertical from "~/components/LayoutVertical.vue";

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

const { data: products, refetch: refetchProducts } = useApi(endpoints.getProducts, {
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
      <ProductViewGrid :products="products ?? []" />
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
</style>
