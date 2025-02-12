<script lang="ts" setup>
import ApiForm from "~/components/Form/ApiForm.vue";
import { endpoints } from "~/api/endpoints";
import FormInputTextArea from "~/components/Form/Input/FormInputTextArea.vue";
import FormInput from "~/components/Form/Input/FormInput.vue";
import ErrorModal from "~/components/ErrorModal.vue";
import { useModal } from "~/composites/useModal";

const props = defineProps<{ cancelButton?: boolean }>();
const emit = defineEmits(["cancel"]);

const modal = useModal();
</script>

<template>
  <ApiForm
    :endpoint="endpoints.postStorage"
    :initialState="{ name: '', description: '' }"
    submitText="Depot Erstellen"
    :cancelText="props.cancelButton ? 'Abbrechen' : undefined"
    :validation="(values, errors) => {
      if (values.name.length < 3) {
        errors.name = {
          message: 'Depot name ist zu kurz, mindestens 3 Zeichen',
          type: 'error'
        };
      }
    }"
    @success="async (data) => {
      await $router.push(`/storage/${data.id}`);
    }"
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
    title="Depot konnte nicht erstellt werden."
    :errors="modal.errors.value"
  />
</template>
