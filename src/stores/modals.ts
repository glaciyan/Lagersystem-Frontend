import { ref } from "vue";
import { defineStore } from "pinia";
import { emitter, Events } from "~/eventBus";
import { z } from "zod";
import { Product, Space, Storage } from "~/api/types";

interface ModalOptions {
  updateEvent: keyof Events;
}

function createModalStore(storeName: string, options: ModalOptions) {
  return defineStore(storeName, () => {
    const isOpen = ref(false);
    const givenId = ref("");

    function open(p: string) {
      isOpen.value = true;
      givenId.value = p;
    }

    function close() {
      isOpen.value = false;
    }

    function update() {
      emitter.emit(options.updateEvent, null);
    }

    return { isOpen, givenId, open, close, update };
  });
}

function updateModalStore<T>(storeName: string, options: ModalOptions) {
  return defineStore(storeName, () => {
    const isOpen = ref(false);
    const item = ref<T | null>(null);

    function open(i: T) {
      isOpen.value = true;
      item.value = i;
    }

    function close() {
      isOpen.value = false;
    }

    function update() {
      emitter.emit(options.updateEvent, null);
    }

    return { isOpen, item, open, close, update };
  });
}

export const useCreateStorageModal = createModalStore("createStorageModal", {
  updateEvent: "storageUpdate",
});

export const useUpdateStorageModal = updateModalStore<z.infer<typeof Storage>>("updateStorageModal", {
  updateEvent: "storageUpdate",
});

export const useCreateSpaceModal = createModalStore("createSpaceModal", {
  updateEvent: "spaceUpdate",
});

export const useUpdateSpaceModal = updateModalStore<z.infer<typeof Space>>("updateSpaceModal", {
  updateEvent: "spaceUpdate",
});

export const useCreateProductModal = defineStore("createProductModal", () => {
  const isOpen = ref(false);

  function open() {
    isOpen.value = true;
  }

  function close() {
    isOpen.value = false;
  }

  function update() {
    emitter.emit("productUpdate", null);
  }

  return { isOpen, open, close, update };
});

export const useUpdateProductModal = updateModalStore<z.infer<typeof Product>>("updateStoreModal", {
  updateEvent: "productUpdate",
});
