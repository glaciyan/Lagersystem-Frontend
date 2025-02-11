<script setup lang="ts">
import StatefulDisplay from "~/components/ViewGrid/StatefulDisplay.vue";
import { ApiError } from "~/lib/api/core";
import { Space, Storage } from "~/api/types";
import { z } from "zod";
import ViewGridHeader from "./ViewGridHeader.vue";
import { Modal } from "ant-design-vue";
import ProductCard from "../ItemCard/ProductCard.vue";
import ItemBreadcrumbs from "../FetchedBreadcrumb.vue";
import IconButton from "../IconButton.vue";
import AddIcon from "~/icons/AddIcon.vue";
import FolderPlusIcon from "~/icons/FolderPlusIcon.vue";
import TheContentGrid from "./TheContentGrid.vue";

const emit = defineEmits<{
  update: [];
  ready: [container: HTMLDivElement | null];
}>();

const props = defineProps<{ data: z.infer<typeof Storage> | null; errors: ApiError[] | null; loading: boolean; aborted: boolean; refetch: () => void; parentId: string }>();

const selectedSpace = ref < z.infer<typeof Space> | null>(null);
const openModal = ref(false);

watch(() => props.data, () => {
  openModal.value = false;
});
</script>

<template>
  <StatefulDisplay
    class="border-2"
    :dataLength="(data?.subStorages.length ?? 0) + (data?.spaces.length ?? 0)"
    :errors
    :loading
    :aborted
    :refetch
    emptyText="Keinen Inhalt vorhanden."
  >
    <template #header>
      <ViewGridHeader
        title="Inhalt"
        :refetch="props.refetch"
      >
        <IconButton
          type="primary"
          @click="$router.push(`/storage/${parentId}/newstorage`)"
        >
          <template #icon>
            <FolderPlusIcon />
          </template>
          Storage Hinzufügen
        </IconButton>
        <IconButton
          type="primary"
          @click="$router.push(`/storage/${parentId}/newspace`)"
        >
          <template #icon>
            <AddIcon />
          </template>
          Space Hinzufügen
        </IconButton>
      </ViewGridHeader>
    </template>

    <template #display>
      <TheContentGrid
        :data
        @update="emit('update')"
        @openSpace="(s) => {
          selectedSpace = s;
          openModal = true;
        }"
        @ready="(container) => emit('ready', container)"
      />
    </template>
  </StatefulDisplay>

  <Modal
    v-model:open="openModal"
    title="Space Details"
    :footer="null"
    width="45rem"
  >
    <ItemBreadcrumbs
      v-if="selectedSpace?.id"
      :id="selectedSpace.id"
      class="!mb-1"
    />
    <p><strong>Name:</strong> {{ selectedSpace?.name }}</p>
    <p><strong>Unit:</strong> {{ selectedSpace?.unit }}</p>
    <p><strong>Size:</strong> {{ selectedSpace?.totalSize }} </p>
    <p><strong>Current size:</strong> {{ selectedSpace?.currentSize }} </p>
    <p><strong>Description:</strong> {{ selectedSpace?.description }}</p>
    <p><strong>Products:</strong></p>
    <div class="grid grid-cols-2 mb-4 mt-6 w-full gap-4 border border-dark-100 rounded-lg p-8">
      <ProductCard
        v-for="prod of selectedSpace?.storedProducts"
        :key="prod.id"
        displayOnly
        :product="prod"
      />
    </div>
    <p><strong>Storage ID:</strong> {{ selectedSpace?.storageId }}</p>
    <p><strong>Created on:</strong> {{ selectedSpace?.createdAt }}</p>
    <p><strong>Last updated:</strong> {{ selectedSpace?.updatedAt || 'N/A' }}</p>
  </Modal>
</template>
