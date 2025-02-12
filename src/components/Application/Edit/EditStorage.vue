<script lang="ts" setup>
import ApiForm from "~/components/Form/ApiForm.vue";
import { endpoints } from "~/api/endpoints";
import FormInputTextArea from "~/components/Form/Input/FormInputTextArea.vue";
import FormInput from "~/components/Form/Input/FormInput.vue";
import ErrorModal from "~/components/ErrorModal.vue";
import { useModal } from "~/composites/useModal";
import { z } from "zod";
import { Storage } from "~/api/types";

const props = defineProps<{ cancelButton?: boolean; storage: z.infer<typeof Storage> | null }>();
const emit = defineEmits(["cancel", "success"]);

const modal = useModal();
</script>

<template>
  <ApiForm
    v-if="storage"
    :endpoint="endpoints.updateStorage"
    :initialState="{ name: storage.name , description: storage.description }"
    :params="{id: storage.id}"
    submitText="Bearbeiten"
    :cancelText="props.cancelButton ? 'Abbrechen' : undefined"
    :validation="(values, errors) => {
      if (values.name.length < 3) {
        errors.name = {
          message: 'Storage name ist zu kurz, mindestens 3 Zeichen',
          type: 'error'
        };
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
  </ApiForm>
  <ErrorModal
    v-model:open="modal.isOpen.value"
    title="Storage konnte nicht bearbeitet werden."
    :errors="modal.errors.value"
  />
</template>
