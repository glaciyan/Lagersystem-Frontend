<script setup lang="ts">
import LayoutVertical from "~/components/LayoutVertical.vue";
import PageContainer from "~/components/PageContainer";
import DepotsViewGrid from "~/components/LSy/DepotsViewGrid.vue";
import { endpoints } from "~/lib/api/config/endpoints";
import { Button } from "ant-design-vue";
import { useApi } from "~/lib/api/useApi";

// const indexStore = useIndexState();

// const reactiveDepots = computed(() => depots.value);

// TODO: do proper typing
// const { refetch } = useApi(endpoints.getStorages, {
//   query: {
//     depth: 1,
//   },
// });

// watch(
//   () => indexStore.updateDepots,
//   () => {
//     console.log("Depots wurden aktualisiert, API wird neu abgerufen...");
//     refetch();
//   },
// );

const { data, loading, errors, aborted, abort, refetch } = useApi(endpoints.getStorages, {});

</script>

<template>
  <PageContainer>
    <!-- Display when the fetch request was aborted -->
    <LayoutVertical v-if="aborted">
      <Button @click="refetch">
        Retry
      </Button>
      <div>Request was aborted.</div>
    </LayoutVertical>

    <!-- Loading state with option to abort -->
    <LayoutVertical v-else-if="loading">
      <Button
        danger
        @click="abort"
      >
        Abort
      </Button>
      <div>Loading data, please wait...</div>
    </LayoutVertical>

    <!-- Error state with retry option -->
    <LayoutVertical v-else-if="errors">
      <Button @click="refetch">
        Retry
      </Button>
      <div class="text-red">
        <strong>Error:</strong> Failed to fetch data.
      </div>
    </LayoutVertical>

    <!-- Render data -->
    <LayoutVertical v-else>
      <Button
        @click="refetch"
      >
        Retry
      </Button>
      <div v-if="data?.length">
        <!-- <div
          v-for="storage in data"
          :key="storage.id"
        >
          {{ storage.name }} - {{ storage.id }}
        </div> -->
        <DepotsViewGrid
          :depots="data ?? []"
        />
      </div>
      <div v-else>
        No storage data available.
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
