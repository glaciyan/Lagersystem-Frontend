import { defineStore } from "pinia";
import { z } from "zod";
import { Product } from "~/api/types";

export const useProductDetailsModal = defineStore("productDetailsModal", () => {
  const isOpen = ref(false);
  const product = ref<z.infer<typeof Product> | null>(null);

  function open(s: z.infer<typeof Product>) {
    isOpen.value = true;
    product.value = s;
  }

  function close() {
    isOpen.value = false;
  }

  return { isOpen, product, open, close };
});
