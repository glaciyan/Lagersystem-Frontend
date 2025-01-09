<script setup lang="ts">
import StatefulDisplay from "~/components/ViewGrid/StatefulDisplay.vue";
import StorageCard from "../ItemCard/StorageCard.vue";
import { ApiError } from "~/lib/api/core";
import AddButton from "../Buttons/AddButton.vue";
import { Storage } from "~/lib/api/types";
import { z } from "zod";
import ViewGridHeader from "./ViewGridHeader.vue";

const emit = defineEmits(["update"]);

const props = defineProps<{ data: z.infer<typeof Storage> | null; errors: ApiError[] | null; loading: boolean; aborted: boolean; refetch: () => void; parentId: string }>();

const displayData = computed(() => props.data?.subStorages ?? []);
</script>

<template>
  <StatefulDisplay
    :data="displayData"
    :errors
    :loading
    :aborted
    :refetch
    emptyText="Keine Storages vorhanden."
  >
    <template #header>
      <ViewGridHeader
        title="Storages"
        :refetch="props.refetch"
      >
        <AddButton :to="`/storage/${parentId}/newstorage`">
          Storage Hinzufügen
        </AddButton>
      </ViewGridHeader>
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
