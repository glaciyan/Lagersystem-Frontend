<script lang="ts" setup>
import PageContainer from "~/components/PageContainer";
import { endpoints } from "~/api/endpoints";
import { useApi } from "~/lib/api/useApi";
import ProductViewGrid from "~/components/ViewGrid/ProductViewGrid.vue";
import { Spin } from "ant-design-vue";
import StorageContentViewGrid from "~/components/ViewGrid/StorageContentViewGrid.vue";
import ItemBreadcrumbs from "~/components/ItemBreadcrumbs.vue";
import DownChevronIcon from "~/icons/DownChevronIcon.vue";

const route = useRoute();
const depotId = ref(route.params.id as string);
const idParam = reactive({
  params: {
    id: route.params.id as string,
  },
});

const { data, errors, aborted, loading, refetch } = useApi(endpoints.getStorage, idParam);

const { data: products, refetch: refetchProducts, errors: productErrors, loading: productsLoading, aborted: productsAborted } = useApi(endpoints.getProducts, {
  params: {},
});

watch(
  () => route.params.id,
  (newId) => {
    if (typeof newId === "string") {
      console.log("New Id loaded", newId);
      idParam.params.id = newId;
      depotId.value = newId;
      // refetch(); // no need to refetch, input is reactive now
      refetchProducts();
    }
  },
);

</script>

<template>
  <div
    class="fixed right-[1rem] top-[10rem] h-[70%] w-[30rem] overflow-scroll border-1 border-dark-2 rounded-md bg-dark-9 shadow-lg"
  >
    <ProductViewGrid
      :data="products"
      :errors="productErrors"
      :loading="productsLoading"
      :refetch="refetchProducts"
      :aborted="productsAborted"
      :originStorageId="depotId"
      @update="refetchProducts"
    />
  </div>
  <PageContainer size="2xl">
    <div class="mb-4 flex flex-row gap-4">
      <div class="flex flex-row gap-2">
        <button
          class="flex border border-2 border-dark-3 rounded-full bg-dark-9 px-2 py-2 transition-colors !m-0 !mb-2 hover:bg-dark-8"
          @click="$router.go(-1)"
        >
          <DownChevronIcon class="rotate-90" />
        </button>
        <!-- No forward button because its confusion -->
        <!-- <button
          :class="['flex border border-2 border-dark-3 rounded-full bg-dark-9 px-2 py-2 transition-colors !m-0 !mb-2 hover:bg-dark-8', $router.]"
          @click="$router.go(+1)"
        >
          <DownChevronIcon class="rotate-270" />
        </button> -->
      </div>
      <div class="mb-2 w-max flex border border-2 border-dark-3 rounded-md bg-dark-9 px-3 py-2">
        <ItemBreadcrumbs :id="depotId" />
      </div>
    </div>

    <div class="text-2xl">
      <h1 v-if="loading">
        <Spin />
      </h1>
      <h1 v-else-if="!data || errors != null || aborted">
        Fehler beim laden!
      </h1>
      <h1 v-else>
        {{ data?.name ?? "..." }}
      </h1>
    </div>

    <div class="flex flex-row gap-4">
      <div class="flex-1">
        <StorageContentViewGrid
          :data
          :errors
          :loading
          :aborted
          :refetch
          :parentId="depotId"
          @update="refetch"
        />
      </div>

      <!-- Padding for the fixed product view grid -->
      <div class="w-[30rem]">
        {{ " " }}
      </div>
    </div>
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
