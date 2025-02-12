import { ApiError } from "~/lib/api/core";

export const useModal = () => {
  const isOpen = ref(false);
  const errors = ref<ApiError[] | null>(null);
  const open = () => isOpen.value = true;
  const close = () => isOpen.value = false;

  const openWithErrors = (err: ApiError[]) => {
    errors.value = err;
    isOpen.value = true;
  };

  return { isOpen, errors, open, openWithErrors, close };
};
