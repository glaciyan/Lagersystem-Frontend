import { defineStore } from "pinia";
import { emitter } from "~/eventBus";

export const useCreateStorageModal = defineStore("createStorageModal", () => {
  const isOpen = ref(false);
  const parentId = ref("");

  function open(p: string) {
    isOpen.value = true;
    parentId.value = p;
  }

  function close() {
    isOpen.value = false;
  }

  function update() {
    emitter.emit("storageUpdate", null);
  }

  return { isOpen, parentId, open, close, update };
});

export const useCreateSpaceModal = defineStore("createSpaceModal", () => {
  const isOpen = ref(false);
  const parentId = ref("");

  function open(p: string) {
    isOpen.value = true;
    parentId.value = p;
  }

  function close() {
    isOpen.value = false;
  }

  function update() {
    emitter.emit("spaceUpdate", null);
  }

  return { isOpen, parentId, open, close, update };
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
