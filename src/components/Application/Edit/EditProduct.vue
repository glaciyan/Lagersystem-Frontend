<script lang="ts" setup>
import ApiForm from "~/components/Form/ApiForm.vue";
import { endpoints } from "~/api/endpoints";
import FormInputTextArea from "~/components/Form/Input/FormInputTextArea.vue";
import FormInput from "~/components/Form/Input/FormInput.vue";
import ErrorModal from "~/components/ErrorModal.vue";
import { useModal } from "~/composites/useModal";
import FormInputNumber from "~/components/Form/Input/FormInputNumber.vue";
import { z } from "zod";
import { Product } from "~/api/types";

const props = defineProps<{ cancelButton?: boolean; product: z.infer<typeof Product> | null }>();
const emit = defineEmits(["cancel", "success"]);

const modal = useModal();

</script>

<template>
  <ApiForm
    v-if="product"
    :endpoint="endpoints.updateProduct"
    :initialState="{ name: product.name, description: product.description, size: product.size }"
    :params="{id: product.id}"
    submitText="Produkt Bearbeiten"
    :cancelText="props.cancelButton ? 'Abbrechen' : undefined"
    :validation="(values, errors) => {
      if (values.name.length < 3) {
        errors.name = {
          message: 'Produktname ist zu kurz, mindestens 3 Zeichen',
          type: 'error'
        };
      }

      if (values.size <= 0) {
        errors.size = {
          message: 'Größe darf nicht gleich oder kleiner als 0 sein',
          type: 'error'
        }
      }
    }"
    @success="emit('success')"
    @failure="(err) => modal.openWithErrors(err)"
    @cancel="emit('cancel')"
  >
    <FormInput
      for="name"
      title="Name"
    />

    <FormInputTextArea
      for="description"
      title="Beschreibung"
    />

    <FormInputNumber
      for="size"
      title="Größe"
    />
  </ApiForm>
  <ErrorModal
    v-model:open="modal.isOpen.value"
    title="Produkt konnte nicht bearbeitet werden."
    :errors="modal.errors.value"
  />
</template>
