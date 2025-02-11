<script lang="ts" setup>
import PageContainer from "~/components/PageContainer";
import { endpoints } from "~/api/endpoints";
import { useApi } from "~/lib/api/useApi";
import ProductViewGrid from "~/components/ViewGrid/ProductViewGrid.vue";
import StorageContentViewGrid from "~/components/ViewGrid/StorageContentViewGrid.vue";
import ItemBreadcrumbs from "~/components/FetchedBreadcrumb.vue";
import DownChevronIcon from "~/icons/DownChevronIcon.vue";
import { Draggable, DragEvent } from "@shopify/draggable";
import { api } from "~/lib/api/api";
import { notification } from "ant-design-vue";
import { match } from "~/lib/api/match";
import { ApiError } from "~/lib/api/core";
import ErrorModal from "~/components/ErrorModal.vue";

// fetch handling and updating
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

const reload = () => {
  refetch();
  refetchProducts();
};

// refferer
const refferer = ref(route.query.ref as string);
watch(() => route.query, () => {
  refferer.value = route.query.ref as string;
});
provide("refferer", refferer);

// draggable
const containers: { product: HTMLDivElement | null; content: HTMLDivElement | null } = {
  product: null,
  content: null,
};

const productViewReady = (container: HTMLDivElement | null) => {
  console.log("Registering product view container", container);
  containers.product = container;
  setupDraggable();
};

const contentViewReady = (container: HTMLDivElement | null) => {
  console.log("Registering content view container", container);
  containers.content = container;
  setupDraggable();
};

let draggable: Draggable | null = null;

const showErrorModal = ref(false);
const resultErrors = ref<ApiError[]>([]);

const setupDraggable = () => {
  if (containers.product !== null && containers.content !== null) {
    console.log("Setting up Draggable...");
    if (draggable !== null) {
      console.log("Draggable instance found clearing it.");
      draggable.destroy();
      draggable = null;
    }

    draggable = new Draggable([containers.content, containers.product], {
      draggable: "div[l-data-id]",
      distance: 30,
    });

    let overElement: HTMLElement | null = null;

    const clearClasses = () => {
      overElement?.classList.remove("drag-success", "drag-fail");
    };

    const getAttributes = (event: DragEvent, attribute: string) => {
      const source = event.source;
      const s = source.getAttribute(attribute);
      const o = overElement?.getAttribute(attribute);
      return [s, o];
    };

    const getTypes = (event: DragEvent) => getAttributes(event, "l-data-type");

    const canDropByAction = (event: DragEvent): "moveSTST" | "moveSST" | "assign" | null => {
      const [sType, oType] = getTypes(event);
      const [sUnit, oUnit] = getAttributes(event, "l-data-unit");
      const [sSize] = getAttributes(event, "l-data-size");
      const [, oCapacity] = getAttributes(event, "l-data-capacity");

      switch (sType) {
        case "product":
          switch (oType) {
            case "space":
              if (sUnit === oUnit && Number(oCapacity) > Number(sSize)) {
                return "assign";
              }
              break;
          }
          break;
        case "space":
          if (oType === "storage") {
            return "moveSST";
          }
          break;
        case "storage":
          if (oType === "storage") {
            return "moveSTST";
          }
          break;
      }

      return null;
    };

    draggable.on("drag:over", (event) => {
      overElement = event.over;
      if (canDropByAction(event) !== null) {
        event.over.classList.add("drag-success");
      }
      else {
        event.over.classList.add("drag-fail");
      }
    });

    draggable.on("drag:out", () => {
      clearClasses();
      overElement = null;
    });

    draggable.on("drag:stop", async (event) => {
      const action = canDropByAction(event);
      if (action !== null) {
        const [sourceId, overId] = getAttributes(event, "l-data-id");
        if (action === "assign") {
          const productId = sourceId;
          const spaceId = overId;
          if (productId && spaceId) {
            const result = await api(endpoints.postStoredProducts, { body: { productId, spaceId, quantity: 1 } }, { headers: {
              "Content-Type": "application/json",
            } });
            match(result, {
              ok: () => {
                notification.success({ message: "Produkt erfolgreich zugewiesen." });
                reload();
              },
              error: (error) => {
                notification.error({
                  message: "Fehler",
                  description: "Das Produkt konnte nicht zugewiesen werden.",
                  duration: 3,
                });
                showErrorModal.value = true;
                resultErrors.value = error;
              },
            });
          }
          else {
            notification.error({ message: "Unable to assign Product, unable to get the ID from HTML." });
          }
        }
        else if (action === "moveSTST") {
          const sourceStorage = sourceId;
          const destinationStorage = overId;
          if (sourceStorage && destinationStorage) {
            const result = await api(endpoints.moveStorage, { body: { newParentId: destinationStorage }, params: { id: sourceStorage } }, { headers: {
              "Content-Type": "application/json",
            } });
            match(result, {
              ok: () => {
                notification.success({ message: "Storage erfolgreich bewegt." });
                reload();
              },
              error: (error) => {
                notification.error({
                  message: "Fehler",
                  description: "Das Produkt konnte nicht bewegt werden.",
                  duration: 3,
                });
                showErrorModal.value = true;
                resultErrors.value = error;
              },
            });
          }
          else {
            notification.error({ message: "Unable to move Storage, unable to get the ID from HTML." });
          }
        }
        else if (action === "moveSST") {
          const sourceSpace = sourceId;
          const destinationStorage = overId;
          if (sourceSpace && destinationStorage) {
            const result = await api(endpoints.moveSpace, { body: { targetStorageId: destinationStorage }, params: { id: sourceSpace } }, { headers: {
              "Content-Type": "application/json",
            } });
            match(result, {
              ok: () => {
                notification.success({ message: "Space erfolgreich bewegt." });
                reload();
              },
              error: (error) => {
                notification.error({
                  message: "Fehler",
                  description: "Das Space konnte nicht bewegt werden.",
                  duration: 3,
                });
                showErrorModal.value = true;
                resultErrors.value = error;
              },
            });
          }
          else {
            notification.error({ message: "Unable to move Space, unable to get the ID from HTML." });
          }
        }
      }
      clearClasses();
    });

    console.log("Draggable initialized");
  }
};
</script>

<template>
  <div
    class="fixed bottom-[3rem] right-[1rem] top-[8rem] w-[30rem] overflow-y-scroll border-1 border-dark-2 rounded-md bg-dark-9 shadow-lg"
  >
    <ProductViewGrid
      :data="products"
      :errors="productErrors"
      :loading="productsLoading"
      :refetch="refetchProducts"
      :aborted="productsAborted"
      :originStorageId="depotId"
      @update="refetchProducts"
      @ready="productViewReady"
    />
  </div>
  <PageContainer size="full">
    <div class="mb-4 flex flex-row gap-4">
      <div class="flex flex-row gap-2">
        <button
          class="flex border border-2 border-dark-3 rounded-full bg-dark-9 px-2 py-2 transition-colors !m-0 !mb-2 hover:bg-dark-8"
          @click="$router.go(-1)"
        >
          <DownChevronIcon class="rotate-90" />
        </button>
      </div>
      <div class="mb-2 w-max flex border border-2 border-dark-3 rounded-md bg-dark-9 px-3 py-2">
        <ItemBreadcrumbs :id="depotId" />
      </div>
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
          @ready="contentViewReady"
        />
      </div>

      <!-- Padding for the fixed product view grid -->
      <div class="w-[30rem]">
        {{ " " }}
      </div>
    </div>
  </PageContainer>
  <ErrorModal
    v-model:open="showErrorModal"
    title="Das Produkt konnte nicht zugewiesen werden."
    :errors="resultErrors"
  />
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
