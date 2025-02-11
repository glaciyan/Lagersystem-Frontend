<script lang="ts" setup>
import ApiForm from "~/components/Form/ApiForm.vue";
import { endpoints } from "~/api/endpoints";
import FormInputTextArea from "~/components/Form/Input/FormInputTextArea.vue";
import FormInput from "~/components/Form/Input/FormInput.vue";
import ErrorModal from "../ErrorModal.vue";
import { useModal } from "~/composites/useModal";

const props = defineProps<{ cancelButton?: boolean; parentId: string }>();
const emit = defineEmits(["cancel", "success"]);

const modal = useModal();
</script>

<template>
  <ApiForm
    :endpoint="endpoints.postStorage"
    :initialState="{ name: '', description: '', parentId: props.parentId }"
    submitText="Storage Erstellen"
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
    title="Storage konnte nicht erstellt werden."
    :errors="modal.errors.value"
  />
</template>
