<script setup lang="ts">
import StatefulDisplay from "~/components/Show/StatefulDisplay.vue";
import StorageCard from "../StorageCard.vue";
import { ApiError } from "~/lib/api/core";
import AddButton from "../AddButton.vue";
import { Storage } from "~/lib/api/types";
import { z } from "zod";

// const props = defineProps<{ id: string }>();

// const { data, errors, loading, aborted, refetch } = useApi(endpoints.getStorage, { params: { id: props.id } });
const emit = defineEmits(["update"]);
const props = defineProps<{ data: z.infer<typeof Storage> | null; errors: ApiError[] | null; loading: boolean; aborted: boolean; refetch: () => void; parentId: string }>();
</script>

<template>
  <StatefulDisplay
    :data="props.data?.subStorages"
    :errors
    :loading
    :aborted
    :refetch
    emptyText="Keine Storages vorhanden."
    itemName="Storages"
  >
    <template #createNew>
      <AddButton :to="`/depot/${parentId}/newstorage`">
        Storage Hinzufügen
      </AddButton>
    </template>

    <template #display>
      <div class="grid grid-cols-1 mt-6 gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
        <StorageCard
          v-for="substorage of props.data!.subStorages"
          :key="substorage.id"
          :storage="substorage"
          @update="emit('update')"
        />
      </div>
    </template>
  </StatefulDisplay>
</template>
