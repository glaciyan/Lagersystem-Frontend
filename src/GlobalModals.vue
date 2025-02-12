<script setup lang="ts">
import { Modal } from "ant-design-vue";
import CreateStorage from "./components/Application/Create/CreateStorage.vue";
import { useCreateProductModal, useCreateSpaceModal, useCreateStorageModal } from "./stores/modals";
import CreateSpace from "./components/Application/Create/CreateSpace.vue";
import CreateProduct from "./components/Application/Create/CreateProduct.vue";

const createStorageModal = useCreateStorageModal();
const createSpaceModal = useCreateSpaceModal();
const createProductModal = useCreateProductModal();
</script>

<template>
  <Modal
    v-model:open="createStorageModal.isOpen"
    title="Storage Erstellen"
    destroyOnClose
    :footer="null"
  >
    <CreateStorage
      :parentId="createStorageModal.parentId"
      cancelButton
      @cancel="createStorageModal.close()"
      @success="() => { createStorageModal.update(); createStorageModal.close() }"
    />
  </Modal>

  <Modal
    v-model:open="createSpaceModal.isOpen"
    title="Space Erstellen"
    destroyOnClose
    :footer="null"
  >
    <CreateSpace
      :storageId="createSpaceModal.parentId"
      cancelButton
      @cancel="createSpaceModal.close()"
      @success="() => { createSpaceModal.update(); createSpaceModal.close() }"
    />
  </Modal>

  <Modal
    v-model:open="createProductModal.isOpen"
    title="Storage Erstellen"
    destroyOnClose
    :footer="null"
  >
    <CreateProduct
      cancelButton
      @cancel="createProductModal.close()"
      @success="() => { createProductModal.update(); createProductModal.close() }"
    />
  </Modal>
</template>
