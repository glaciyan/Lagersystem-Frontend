<script setup lang="ts">
import PageContainer from "~/components/PageContainer";
import GButton from "~/components/Button/BaseButton.vue";
import CreateDepot from "~/components/LSy/CreateDepot.vue";
import DepotsViewGrid from "~/components/LSy/DepotsViewGrid.vue";

import { ref, onMounted, watch } from "vue";
import { useStorageStore } from "~/stores/storageStore.ts";
import ApiForm from "~/components/Form/ApiForm.vue";
import { endpoints } from "~/lib/api/config/endpoints";
import FormInput from "~/components/Form/FormInput.vue";
import { Button } from "ant-design-vue";
import { useApi } from "~/lib/api/useApi";

const showCreateDepot = ref(false);
const storageStore = useStorageStore();

onMounted(() => {
  storageStore.fetchStorages();
});

const toggleCreateDepot = () => {
  showCreateDepot.value = true;
};
const closeCreateDepot = () => {
  showCreateDepot.value = false;
};
watch(showCreateDepot, (newValue) => {
  if (!newValue) {
    storageStore.refreshStorages();
  }
});

const { data: storages, errors, loading } = useApi(endpoints.getStorages, {
  query: {
    depth: 1,
  },
});
</script>

<template>
  <PageContainer>
    <GButton
      label="Create Depot"
      @click="toggleCreateDepot"
    />

    <CreateDepot
      v-if="showCreateDepot"
      placeholder="Please enter your depot name"
      @close="closeCreateDepot"
    />
  </PageContainer>
  <DepotsViewGrid :depots="storageStore.storages" />
  <ApiForm
    :endpoint="endpoints.postStorage"
    :initialState="{name: '', description: ''}"
    @success="(data) => console.log(data)"
    @failure="(err) => console.log(err)"
  >
    <FormInput for="name" />
    <FormInput for="description" />
    <Button
      htmlType="submit"
      type="primary"
    >
      Submit
    </Button>
  </ApiForm>
  <div v-if="loading">
    <p>Loading...</p>
  </div>
  <div v-else>
    <p
      v-for="storage of storages"
      :key="storage.id"
    >
      {{ storage.name }} - {{ storage.id }}
    </p>
  </div>
</template>

<style scoped>
.error {
  color: red;
  margin-top: 10px;
}
</style>
