<script setup lang="ts">
import { endpoints } from "~/api/endpoints";
import { useApi } from "~/lib/api/useApi";
import StatefulDisplay from "~/components/Application/ViewGrid/StatefulDisplay.vue";
import StorageCard from "~/components/Application/ItemCard/StorageCard.vue";
import ViewGridHeader from "~/components/Application/ViewGrid/ViewGridHeader.vue";
import IconButton from "~/components/IconButton.vue";
import FolderPlusIcon from "~/icons/FolderPlusIcon.vue";
import { Modal } from "ant-design-vue";
import CreateDepot from "~/components/Application/Create/CreateDepot.vue";
import { useModal } from "~/composites/useModal";

const { data, errors, loading, aborted, refetch } = useApi(endpoints.getStorages, {});
const modal = useModal();
provide("refferer", null);
</script>

<template>
  <StatefulDisplay
    :dataLength="data?.length"
    :errors
    :loading
    :aborted
    :refetch
    emptyText="Keine Depots vorhanden"
  >
    <template #header>
      <ViewGridHeader
        title="Depots"
        :refetch="refetch"
      >
        <IconButton
          type="primary"
          @click="modal.open()"
        >
          <template #icon>
            <FolderPlusIcon />
          </template>
          Depot Erstellen
        </IconButton>
      </ViewGridHeader>
    </template>

    <template #display>
      <!-- <DepotsViewGrid :depots="data ?? []" /> -->
      <div class="grid grid-cols-1 mt-6 gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
        <StorageCard
          v-for="depot of data"
          :key="depot.id"
          :storage="depot"
          @update="refetch"
        />
      </div>
    </template>
  </StatefulDisplay>
  <Modal
    v-model:open="modal.isOpen.value"
    title="Depot Erstellen"
    destroyOnClose
    :footer="null"
  >
    <CreateDepot
      cancelButton
      @cancel="modal.close()"
    />
  </Modal>
</template>
