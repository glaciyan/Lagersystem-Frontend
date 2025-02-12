<script setup lang="ts">
import StatefulDisplay from "~/components/Application/ViewGrid/StatefulDisplay.vue";
import { ApiError } from "~/lib/api/core";
import { Storage } from "~/api/types";
import { z } from "zod";
import ViewGridHeader from "~/components/Application/ViewGrid/ViewGridHeader.vue";

import IconButton from "~/components/IconButton.vue";
import AddIcon from "~/icons/AddIcon.vue";
import FolderPlusIcon from "~/icons/FolderPlusIcon.vue";
import TheContentGrid from "./TheContentGrid.vue";
import { useCreateSpaceModal, useCreateStorageModal } from "~/stores/modals";
import { useSpaceDetailsModal } from "../Details/useSpaceModalStore";
import SpaceDetails from "../Details/SpaceDetails.vue";

const emit = defineEmits<{
  ready: [container: HTMLDivElement | null];
}>();

const props = defineProps<{ data: z.infer<typeof Storage> | null; errors: ApiError[] | null; loading: boolean; aborted: boolean; refetch: () => void; parentId: string }>();

const createStorageModal = useCreateStorageModal();
const createSpaceModal = useCreateSpaceModal();
const spaceDetailModal = useSpaceDetailsModal();
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
          @click="createStorageModal.open(parentId)"
        >
          <template #icon>
            <FolderPlusIcon />
          </template>
          Storage Hinzufügen
        </IconButton>
        <IconButton
          type="primary"
          @click="createSpaceModal.open(parentId)"
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
        @openSpace="(s) => {
          spaceDetailModal.open(s);
        }"
        @ready="(container) => emit('ready', container)"
      />
    </template>
  </StatefulDisplay>

  <SpaceDetails />
</template>
