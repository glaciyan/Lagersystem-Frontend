<script setup lang="ts">
import StatefulDisplay from "~/components/Show/StatefulDisplay.vue";
import { Modal } from "ant-design-vue";
import { ApiError } from "~/lib/api/core";
import AddButton from "../AddButton.vue";
import { Product, ProductArray } from "~/lib/api/types";
import { z } from "zod";
import ProductCard from "../ProductCard.vue";
import AssignButton from "../AssignButton.vue";

const selectedProduct = ref < z.infer<typeof Product> | null>(null);
const openModal = ref(false);
// const props = defineProps<{ id: string }>();

// const { data, errors, loading, aborted, refetch } = useApi(endpoints.getStorage, { params: { id: props.id } });
const emit = defineEmits(["update"]);
const props = defineProps<{ data: z.infer<typeof ProductArray> | null; errors: ApiError[] | null; loading: boolean; aborted: boolean; refetch: () => void; originStorageId?: string }>();
</script>

<template>
  <StatefulDisplay
    :data="props.data"
    :errors
    :loading
    :aborted
    :refetch
    emptyText="Keine Produkte vorhanden."
    itemName="Produkte"
  >
    <template #createNew>
      <AddButton :to="`/product/create${props.originStorageId ? `?origin=${props.originStorageId}` : ''}`">
        Produkt Erstellen
      </AddButton>
      <AssignButton :to="`/product/assign${props.originStorageId ? `?origin=${props.originStorageId}` : ''}`">
        Produkt Zusweisen
      </AssignButton>
    </template>

    <template #display>
      <div class="grid grid-cols-1 mt-6 gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
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
