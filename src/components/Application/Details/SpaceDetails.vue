<script setup lang="ts">
import { Modal, Progress, Spin } from "ant-design-vue";
import { formatUnit } from "~/lib/formatUnit";
import StoredProductCard from "../ItemCard/StoredProductCard.vue";
import ItemBreadcrumbs from "~/components/FetchedBreadcrumb.vue";
import { useSpaceDetailsModal } from "./useSpaceModalStore";
import { z } from "zod";
import { Space } from "~/api/types";
import { endpoints } from "~/api/endpoints";
import { api } from "~/lib/api/api";
import { match } from "~/lib/api/match";
import { ApiError } from "~/lib/api/core";
import ErrorModal from "~/components/ErrorModal.vue";
import { useModal } from "~/composites/useModal";

const spaceDetailModal = useSpaceDetailsModal();
const loadedSpace = reactive<{ data: z.infer<typeof Space> | null; errors: ApiError[] | null; loading: boolean }>({ data: null, errors: null, loading: true });

const errorModal = useModal();

const fetchStoredProducts = async (space: z.infer<typeof Space>) => {
  if (space) {
    loadedSpace.loading = true;
    const result = await api(endpoints.getSpace, { params: { id: space.id } });
    match(result, {
      ok: (data) => {
        loadedSpace.data = data;
        loadedSpace.loading = false;
      },
      error: (errors) => {
        errorModal.openWithErrors(errors);
        loadedSpace.errors = errors;
        loadedSpace.loading = false;
      },
    });
  }
};

function fetchWithCurrent() {
  if (spaceDetailModal.space) {
    fetchStoredProducts(spaceDetailModal.space);
  }
}

watchEffect(() => {
  if (spaceDetailModal.space) {
    fetchStoredProducts(spaceDetailModal.space);
  }
});
</script>

<template>
  <Modal
    v-model:open="spaceDetailModal.isOpen"
    title="Space Details"
    :footer="null"
    width="45rem"
  >
    <Spin v-if="loadedSpace.loading" />
    <div
      v-else-if="loadedSpace.data"
      class="p-6 space-y-6"
    >
      <div
        v-if="loadedSpace.data.id"
        @click="spaceDetailModal.close()"
      >
        <ItemBreadcrumbs
          :id="loadedSpace.data.id"
          class="mb-4"
        />
      </div>

      <div v-if="loadedSpace.data.description">
        <p class="mb-1 font-semibold">
          Description:
        </p>
        <p class="">
          {{ loadedSpace.data.description }}
        </p>
      </div>
      <span class="text-base text-light-9">
        {{ formatUnit(loadedSpace.data.currentSize, loadedSpace.data.unit ?? "") }} / {{ formatUnit(loadedSpace.data.totalSize, loadedSpace.data.unit ?? "") }}
      </span>
      <div class="min-w-[10rem] !mt-0">
        <Progress :percent="Math.round(loadedSpace.data.currentSize/loadedSpace.data.totalSize * 100)" />
      </div>

      <div
        class="mt-6"
      >
        <p class="mb-2 font-semibold">
          Products:
        </p>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <StoredProductCard
            v-for="prod of loadedSpace.data.storedProducts"
            :key="prod.id"
            :product="prod"
            :space="loadedSpace.data"
            @update="fetchWithCurrent"
          />
        </div>
      </div>
    </div>
  </Modal>
  <ErrorModal
    v-model:open="
      errorModal.isOpen.value"
    title="Fehler beim laden von Produkten"
    :errors="loadedSpace.errors"
  />
</template>
