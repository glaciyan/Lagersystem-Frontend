<script setup lang="ts">
import { watch, computed } from "vue";
import PageContainer from "~/components/PageContainer";
import CreateDepot from "~/components/LSy/CreateDepot.vue";
import DepotsViewGrid from "~/components/LSy/DepotsViewGrid.vue";

import { useIndexState } from "~/stores/IndexState.ts";
import { endpoints } from "~/lib/api/config/endpoints";
import { Button } from "ant-design-vue";
import { useApi } from "~/lib/api/useApi";

const indexStore = useIndexState();

const reactiveDepots = computed(() => depots.value);

const { data: storages, errors, loading, refetch } = useApi(endpoints.getStorages, {
  query: {
    depth: 1,
  },
});

watch(
  () => indexStore.updateDepots,
  () => {
    console.log("Depots wurden aktualisiert, API wird neu abgerufen...");
    refetch();
  },
);

</script>

<template>
  <PageContainer>
    <Button
      htmlType="submit"
      type="primary"
      @click="indexStore.toggleCreateDepot"
    >
      Create Depot
    </Button>

    <CreateDepot
      v-if="indexStore.showCreateDepot"
      @close="indexStore.toggleCreateDepot"
    />
  </PageContainer>
  <DepotsViewGrid
      :depots="reactiveDepots ?? []"
    @success="(data) => console.log(data)"
    @failure="(err) => console.log(err)"
  />
</template>

<style scoped>
.error {
  color: red;
  margin-top: 10px;
}
</style>
