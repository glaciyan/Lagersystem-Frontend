<script setup lang="ts">
import StatefulDisplay from "~/components/Application/ViewGrid/StatefulDisplay.vue";
import { ApiError } from "~/lib/api/core";
import { ProductArray } from "~/api/types";
import { z } from "zod";
import ViewGridHeader from "~/components/Application/ViewGrid/ViewGridHeader.vue";
import TheProductGrid from "~/components/Application/ViewGrid/TheProductGrid.vue";
import IconButton from "~/components/IconButton.vue";
import AddIcon from "~/icons/AddIcon.vue";
import { useCreateProductModal } from "~/stores/modals";
import ProductDetails from "../Details/ProductDetails.vue";
import { useProductDetailsModal } from "../Details/useProductModalStore";

const emit = defineEmits<{
  ready: [container: HTMLDivElement | null];
}>();

const props = defineProps<{ data: z.infer<typeof ProductArray> | null; errors: ApiError[] | null; loading: boolean; aborted: boolean; refetch: () => void; originStorageId?: string }>();

const createProductModal = useCreateProductModal();

const productDetailsModal = useProductDetailsModal();
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
        @open="(p) => productDetailsModal.open(p)"
        @ready="(container) => emit('ready', container)"
      />
    </template>
  </StatefulDisplay>

  <ProductDetails />
</template>
