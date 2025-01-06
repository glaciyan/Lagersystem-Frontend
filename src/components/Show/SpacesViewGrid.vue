<script setup lang="ts">
import StatefulDisplay from "~/components/Show/StatefulDisplay.vue";
import { Modal } from "ant-design-vue";
import { ApiError } from "~/lib/api/core";
import AddButton from "../AddButton.vue";
import SpaceCard from "../SpaceCard.vue";
import { Space, Storage } from "~/lib/api/types";
import { z } from "zod";

const selectedSpace = ref < z.infer<typeof Space> | null>(null);
const openModal = ref(false);
// const props = defineProps<{ id: string }>();

// const { data, errors, loading, aborted, refetch } = useApi(endpoints.getStorage, { params: { id: props.id } });
const emit = defineEmits(["update"]);
const props = defineProps<{ data: z.infer<typeof Storage> | null; errors: ApiError[] | null; loading: boolean; aborted: boolean; refetch: () => void; parentId: string }>();
</script>

<template>
  <StatefulDisplay
    :data="props.data?.spaces"
    :errors
    :loading
    :aborted
    :refetch
    emptyText="Keine Spaces vorhanden."
    itemName="Spaces"
  >
    <template #createNew>
      <AddButton :to="`/depot/${parentId}/newspace`">
        Space Hinzufügen
      </AddButton>
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
  >
    <p><strong>Name:</strong> {{ selectedSpace?.name }}</p>
    <p><strong>Unit:</strong> {{ selectedSpace?.unit }}</p>
    <p><strong>Size:</strong> {{ selectedSpace?.totalSize }} </p>
    <p><strong>Current size:</strong> {{ selectedSpace?.currentSize }} </p>
    <p><strong>Description:</strong> {{ selectedSpace?.description }}</p>
    <!-- <p><strong>Products:</strong> {{ selectedSpace?.products.length }}</p> -->
    <p><strong>Storage ID:</strong> {{ selectedSpace?.storageId }}</p>
    <p><strong>Created on:</strong> {{ selectedSpace?.createdAt }}</p>
    <p><strong>Last updated:</strong> {{ selectedSpace?.updatedAt || 'N/A' }}</p>
  </Modal>
</template>
