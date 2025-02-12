<script lang="ts" setup>
import ApiForm from "~/components/Form/ApiForm.vue";
import { endpoints } from "~/api/endpoints";
import FormInputTextArea from "~/components/Form/Input/FormInputTextArea.vue";
import FormInput from "~/components/Form/Input/FormInput.vue";
import ErrorModal from "~/components/ErrorModal.vue";
import { useModal } from "~/composites/useModal";
import FormInputNumber from "~/components/Form/Input/FormInputNumber.vue";

const props = defineProps<{ cancelButton?: boolean; storageId: string }>();
const emit = defineEmits(["cancel", "success"]);

const modal = useModal();
</script>

<template>
  <ApiForm
    :endpoint="endpoints.postSpace"
    :initialState="{ name: '', totalSize: 5, unit: '', description: '', storageId: props.storageId }"
    submitText="Space Erstellen"
    :cancelText="props.cancelButton ? 'Abbrechen' : undefined"
    :validation="(values, errors) => {
      if (values.name.length < 3) {
        errors.name = {
          message: 'Space name ist zu kurz, mindestens 3 Zeichen',
          type: 'error'
        };
      }

      if (values.totalSize <= 0) {
        errors.totalSize = {
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

    <FormInputNumber
      for="totalSize"
      title="Größe"
    />

    <FormInput
      for="unit"
      title="Einheit"
    />

    <FormInputTextArea
      for="description"
      title="Beschreibung"
    />
  </ApiForm>
  <ErrorModal
    v-model:open="modal.isOpen.value"
    title="Space konnte nicht erstellt werden."
    :errors="modal.errors.value"
  />
</template>
