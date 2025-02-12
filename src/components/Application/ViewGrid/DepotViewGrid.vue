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
import { useSubscription } from "~/composites/useSubscription";

const { data, errors, loading, aborted, refetch } = useApi(endpoints.getStorages, {});
const modal = useModal();
provide("refferer", null);
useSubscription("storageUpdate", () => refetch(true));
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
      <div
        class="grid grid-auto-cols-[repeat(auto-fit,minmax(_150px,_1fr))] grid-cols-2 mt-6 w-full gap-4 lg:grid-cols-3 xl:grid-cols-4"
      >
        <TransitionGroup>
          <StorageCard
            v-for="depot of data"
            :key="depot.id"
            :storage="depot"
          />
        </TransitionGroup>
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

<style scoped>
.v-move,
.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease;
}

.v-leave-active {
  position: absolute;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
