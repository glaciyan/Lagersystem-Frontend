<script setup lang="ts">
import StatefulDisplay from "~/components/Application/ViewGrid/StatefulDisplay.vue";
import { Modal } from "ant-design-vue";
import { ApiError } from "~/lib/api/core";
import { Product, ProductArray } from "~/api/types";
import { z } from "zod";
import ViewGridHeader from "~/components/Application/ViewGrid/ViewGridHeader.vue";
import TheProductGrid from "~/components/Application/ViewGrid/TheProductGrid.vue";
import { useModal } from "~/composites/useModal";
import IconButton from "~/components/IconButton.vue";
import AddIcon from "~/icons/AddIcon.vue";
import CreateProduct from "~/components/Application/Create/CreateProduct.vue";

const emit = defineEmits<{
  update: [];
  ready: [container: HTMLDivElement | null];
}>();

const props = defineProps<{ data: z.infer<typeof ProductArray> | null; errors: ApiError[] | null; loading: boolean; aborted: boolean; refetch: () => void; originStorageId?: string }>();

const selectedProduct = ref < z.infer<typeof Product> | null>(null);
const infoModal = useModal();
const createProductModal = useModal();
</script>

<template>
  <StatefulDisplay
    noBorder
    :dataLength="props.data?.length"
    :errors
    :loading
    :aborted
    :refetch
    emptyText="Keine Produkte vorhanden."
  >
    <template #header>
      <ViewGridHeader
        title="Produkte"
        :refetch="refetch"
      >
        <!-- TODO replace with IconButton -->
        <IconButton
          type="primary"
          @click="createProductModal.open()"
        >
          <template #icon>
            <AddIcon />
          </template>
          Erstellen
        </IconButton>
      </ViewGridHeader>
    </template>

    <template #display>
      <TheProductGrid
        :data
        @update="emit('update')"
        @open="(p) => {
          selectedProduct = p;
          infoModal.open()
        }"
        @ready="(container) => emit('ready', container)"
      />
    </template>
  </StatefulDisplay>

  <Modal
    v-model:open="createProductModal.isOpen.value"
    title="Storage Erstellen"
    destroyOnClose
    :footer="null"
  >
    <CreateProduct
      cancelButton
      @cancel="createProductModal.close()"
      @success="() => { emit('update'); createProductModal.close() }"
    />
  </Modal>

  <Modal
    v-model:open="infoModal.isOpen.value"
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
