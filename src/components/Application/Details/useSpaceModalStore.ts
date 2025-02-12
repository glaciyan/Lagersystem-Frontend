import { defineStore } from "pinia";
import { z } from "zod";
import { Space } from "~/api/types";

export const useSpaceDetailsModal = defineStore("spaceDetailsModal", () => {
  const isOpen = ref(false);
  const space = ref<z.infer<typeof Space> | null>(null);

  function open(s: z.infer<typeof Space>) {
    isOpen.value = true;
    space.value = s;
  }

  function close() {
    isOpen.value = false;
  }

  return { isOpen, space, open, close };
});
