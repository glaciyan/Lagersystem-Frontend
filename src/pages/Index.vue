<script setup lang="ts">
import LayoutVertical from "~/components/LayoutVertical.vue";
import LayoutHorizontal from "~/components/LayoutHorizontal.vue";
import PageContainer from "~/components/PageContainer";
import DepotsViewGrid from "~/components/Show/DepotsViewGrid.vue";
import CreateDepot from "~/components/Create/CreateDepot.vue";
import { endpoints } from "~/lib/api/config/endpoints";
import { Button } from "ant-design-vue";
import { useApi } from "~/lib/api/useApi";

const showCreateDepot = ref(false);
const triggerUpdate = () => {
  toggleShowCreateDepot();
  refetch();
};

function toggleShowCreateDepot() {
  showCreateDepot.value = !showCreateDepot.value;
}

const { data, errors, loading, abort, aborted, refetch } = useApi(endpoints.getStorages, {});

</script>

<template>
  <PageContainer>
    <LayoutVertical v-if="aborted">
      <Button @click="refetch">
        Retry
      </Button>

      <div>Request was aborted.</div>
    </LayoutVertical>
    <CreateDepot v-if="showCreateDepot" @triggerUpdate="triggerUpdate" />

    <LayoutVertical v-else-if="loading">
      <Button danger @click="abort">
        Abort
      </Button>
      <div>Loading data, please wait...</div>
    </LayoutVertical>

    <LayoutVertical v-else-if="errors">
      <Button @click="refetch">
        Retry
      </Button>
      <div class="text-red">
        <strong>Error:</strong> Failed to fetch data.
      </div>
    </LayoutVertical>

    <LayoutVertical v-else>
      <LayoutHorizontal>
        <Button @click="refetch">
          Retry
        </Button>

        <Button @click="toggleShowCreateDepot">
          Add Depot
        </Button>
      </LayoutHorizontal>

      <div v-if="data?.length">
        <DepotsViewGrid :depots="data ?? []" />
      </div>
      <div v-else>
        There is currently no depot, please add a new one and configure it!
      </div>
    </LayoutVertical>
  </PageContainer>
</template>

<style scoped>
.error {
  color: red;
  margin-top: 10px;
}
</style>
