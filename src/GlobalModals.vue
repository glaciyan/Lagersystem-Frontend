<script setup lang="ts">
import { Modal } from "ant-design-vue";
import CreateStorage from "./components/Application/Create/CreateStorage.vue";
import { useCreateProductModal, useCreateSpaceModal, useCreateStorageModal, useUpdateProductModal, useUpdateSpaceModal, useUpdateStorageModal } from "./stores/modals";
import CreateSpace from "./components/Application/Create/CreateSpace.vue";
import CreateProduct from "./components/Application/Create/CreateProduct.vue";
import EditStorage from "./components/Application/Edit/EditStorage.vue";
import EditSpace from "./components/Application/Edit/EditSpace.vue";
import EditProduct from "./components/Application/Edit/EditProduct.vue";

const createStorageModal = useCreateStorageModal();
const updateStorageModal = useUpdateStorageModal();

const createSpaceModal = useCreateSpaceModal();
const updateSpaceModal = useUpdateSpaceModal();

const createProductModal = useCreateProductModal();
const updateProductModal = useUpdateProductModal();
</script>

<template>
  <Modal
    v-model:open="createStorageModal.isOpen"
    title="Storage Erstellen"
    destroyOnClose
    :footer="null"
  >
    <CreateStorage
      :parentId="createStorageModal.givenId!"
      cancelButton
      @cancel="createStorageModal.close()"
      @success="() => { createStorageModal.update(); createStorageModal.close() }"
    />
  </Modal>

  <Modal
    v-model:open="updateStorageModal.isOpen"
    title="Storage Bearbeiten"
    destroyOnClose
    :footer="null"
  >
    <EditStorage
      :storage="updateStorageModal.item"
      cancelButton
      @cancel="updateStorageModal.close()"
      @success="() => { updateStorageModal.update(); updateStorageModal.close() }"
    />
  </Modal>

  <Modal
    v-model:open="createSpaceModal.isOpen"
    title="Space Erstellen"
    destroyOnClose
    :footer="null"
  >
    <CreateSpace
      :storageId="createSpaceModal.givenId"
      cancelButton
      @cancel="createSpaceModal.close()"
      @success="() => { createSpaceModal.update(); createSpaceModal.close() }"
    />
  </Modal>

  <Modal
    v-model:open="updateSpaceModal.isOpen"
    title="Space Bearbeiten"
    destroyOnClose
    :footer="null"
  >
    <EditSpace
      :space="updateSpaceModal.item"
      cancelButton
      @cancel="updateSpaceModal.close()"
      @success="() => { updateSpaceModal.update(); updateSpaceModal.close() }"
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

  <Modal
    v-model:open="updateProductModal.isOpen"
    title="Space Bearbeiten"
    destroyOnClose
    :footer="null"
  >
    <EditProduct
      :product="updateProductModal.item"
      cancelButton
      @cancel="updateProductModal.close()"
      @success="() => { updateProductModal.update(); updateProductModal.close() }"
    />
  </Modal>
</template>
