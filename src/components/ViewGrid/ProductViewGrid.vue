<script setup lang="ts">
import StatefulDisplay from "~/components/ViewGrid/StatefulDisplay.vue";
import { Modal } from "ant-design-vue";
import { ApiError } from "~/lib/api/core";
import AddButton from "../Buttons/AddButton.vue";
import { Product, ProductArray } from "~/api/types";
import { z } from "zod";
import ProductCard from "../ItemCard/ProductCard.vue";
import ViewGridHeader from "./ViewGridHeader.vue";

const emit = defineEmits(["update"]);

const props = defineProps<{ data: z.infer<typeof ProductArray> | null; errors: ApiError[] | null; loading: boolean; aborted: boolean; refetch: () => void; originStorageId?: string }>();

const selectedProduct = ref < z.infer<typeof Product> | null>(null);
const openModal = ref(false);
</script>

<template>
  <StatefulDisplay
    class=""
    :dataLength="props.data?.length"
    :errors
    :loading
    :aborted
    emptyText="Keine Produkte vorhanden."
  >
    <template #header>
      <ViewGridHeader
        title="Produkte"
      >
        <AddButton :to="`/product/create${props.originStorageId ? `?origin=${props.originStorageId}` : ''}`">
          Erstellen
        </AddButton>
      </ViewGridHeader>
    </template>

    <template #display>
      <div class="grid grid-cols-2 mt-6 gap-4">
        <ProductCard
          v-for="product of props.data"
          :key="product.id"
          :product="product"
          @update="emit('update')"
          @open="() => {
            selectedProduct = product;
            openModal = true;
          }"
        />
      </div>
    </template>
  </StatefulDisplay>

  <Modal
    v-model:open="openModal"
    title="Produktdetails"
    :footer="null"
  >
    <p><strong>Name:</strong> {{ selectedProduct?.name }}</p>
    <p><strong>Größe:</strong> {{ selectedProduct?.size }} </p>
    <p><strong>Einheit:</strong> {{ selectedProduct?.unit }}</p>
    <p><strong>Beschreibung:</strong> {{ selectedProduct?.description }}</p>
    <p><strong>Attribute:</strong> {{ selectedProduct?.attributes }}</p>
    <p><strong>Erstellt am:</strong> {{ selectedProduct?.createdAt }}</p>
    <p><strong>Zuletzt aktualisiert:</strong> {{ selectedProduct?.updatedAt || 'N/A' }}</p>
  </Modal>
</template>
