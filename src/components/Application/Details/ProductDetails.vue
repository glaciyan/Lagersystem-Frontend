<script setup lang="ts">
import { Modal, Spin } from "ant-design-vue";
import { z } from "zod";
import { Product } from "~/api/types";
import { endpoints } from "~/api/endpoints";
import { api } from "~/lib/api/api";
import { match } from "~/lib/api/match";
import { ApiError } from "~/lib/api/core";
import ErrorModal from "~/components/ErrorModal.vue";
import { useModal } from "~/composites/useModal";
import { useProductDetailsModal } from "./useProductModalStore";
import { formatUnit } from "~/lib/formatUnit";

const productDetailModal = useProductDetailsModal();
const loadedProduct = reactive<{ data: z.infer<typeof Product> | null; errors: ApiError[] | null; loading: boolean }>({ data: null, errors: null, loading: true });

const errorModal = useModal();

const fetchStoredProducts = async (product: z.infer<typeof Product>, refetch = false) => {
  if (product) {
    loadedProduct.loading = !refetch;
    const result = await api(endpoints.getProduct, { params: { id: product.id } });
    match(result, {
      ok: (data) => {
        loadedProduct.data = data;
        loadedProduct.loading = false;
      },
      error: (errors) => {
        errorModal.openWithErrors(errors);
        loadedProduct.errors = errors;
        loadedProduct.loading = false;
      },
    });
  }
};

watchEffect(() => {
  if (productDetailModal.product) {
    fetchStoredProducts(productDetailModal.product);
  }
});
</script>

<template>
  <Modal
    v-model:open="productDetailModal.isOpen"
    title="Produkt Details"
    :footer="null"
    width="45rem"
  >
    <Spin v-if="loadedProduct.loading" />
    <div
      v-else-if="loadedProduct.data"
      class="p-6 space-y-6"
    >
      <h1 class="text-xl">
        {{ loadedProduct.data.name }}
        <span class="text-sm text-gray-4">id: {{ loadedProduct.data.id }}</span>
      </h1>

      <div class="text-base text-gray-3 !mb-4 !mt-4">
        <div>
          <span class="text-base text-gray-4">Erstellt am:</span> {{ new Date(loadedProduct.data.createdAt).toLocaleString("de-DE") }}
        </div>
        <div v-if="loadedProduct.data.updatedAt">
          <span class="text-base text-gray-4">Letzte Bearbeitung am:</span> {{ new Date(loadedProduct.data.updatedAt).toLocaleString("de-DE") }}
        </div>
      </div>

      <div><span class="text-base text-gray-4">Größe:</span> <span>{{ formatUnit(loadedProduct.data.size, loadedProduct.data.unit ?? "") }}</span></div>

      <div v-if="loadedProduct.data.description">
        <p class="mb-1 font-semibold">
          Beschreibung:
        </p>
        <p class="">
          {{ loadedProduct.data.description }}
        </p>
      </div>
    </div>
  </Modal>
  <ErrorModal
    v-model:open="errorModal.isOpen.value"
    title="Fehler beim laden von Produkten"
    :errors="loadedProduct.errors"
  />
</template>
