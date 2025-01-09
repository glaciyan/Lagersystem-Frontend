<script setup lang="ts">
import StatefulDisplay from "~/components/ViewGrid/StatefulDisplay.vue";
import { Modal } from "ant-design-vue";
import { ApiError } from "~/lib/api/core";
import AddButton from "../Buttons/AddButton.vue";
import SpaceCard from "../ItemCard/SpaceCard.vue";
import { Space, Storage } from "~/lib/api/types";
import { z } from "zod";
import ProductCard from "../ItemCard/ProductCard.vue";
import ViewGridHeader from "./ViewGridHeader.vue";

const emit = defineEmits(["update"]);

const props = defineProps<{ data: z.infer<typeof Storage> | null; errors: ApiError[] | null; loading: boolean; aborted: boolean; refetch: () => void; parentId: string }>();

const selectedSpace = ref < z.infer<typeof Space> | null>(null);
const openModal = ref(false);
</script>

<template>
  <StatefulDisplay
    :data="props.data?.spaces"
    :errors
    :loading
    :aborted
    :refetch
    emptyText="Keine Spaces vorhanden."
  >
    <template #header>
      <ViewGridHeader
        title="Spaces"
        :refetch="refetch"
      >
        <AddButton :to="`/storage/${parentId}/newspace`">
          Space Hinzufügen
        </AddButton>
      </ViewGridHeader>
    </template>

    <template #display>
      <div class="grid grid-cols-1 mt-6 gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
        <SpaceCard
          v-for="space of props.data!.spaces"
          :key="space.id"
          :space="space"
          @update="emit('update')"
          @open="() => {
            selectedSpace = space;
            openModal = true;
          }"
        />
      </div>
    </template>
  </StatefulDisplay>

  <Modal
    v-model:open="openModal"
    title="Space Details"
    :footer="null"
    width="45rem"
  >
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
