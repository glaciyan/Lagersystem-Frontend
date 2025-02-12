<script lang="ts" setup>
import ApiForm from "~/components/Form/ApiForm.vue";
import { endpoints } from "~/api/endpoints";
import FormInputTextArea from "~/components/Form/Input/FormInputTextArea.vue";
import FormInput from "~/components/Form/Input/FormInput.vue";
import ErrorModal from "~/components/ErrorModal.vue";
import { useModal } from "~/composites/useModal";
import FormInputNumber from "~/components/Form/Input/FormInputNumber.vue";
import LayoutHorizontal from "~/components/LayoutHorizontal.vue";
import LayoutVertical from "~/components/LayoutVertical.vue";
import FormCheckbox from "~/components/Form/Input/FormCheckbox.vue";

const props = defineProps<{ cancelButton?: boolean }>();
const emit = defineEmits(["cancel", "success"]);

const modal = useModal();

</script>

<template>
  <ApiForm
    :endpoint="endpoints.postProduct"
    :initialState="{ name: '', description: '', size: 1, unit: '', unique: false }"
    submitText="Produkt Erstellen"
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

    <LayoutHorizontal class="w-full">
      <LayoutVertical class="w-full">
        <FormInputNumber
          for="size"
          title="Größe"
        />
      </LayoutVertical>
      <LayoutVertical class="w-full">
        <FormInput
          for="unit"
          title="Einheit"
        />
      </LayoutVertical>
    </LayoutHorizontal>

    <FormCheckbox
      for="unique"
      tooltip="Dieses Produkt kann nur einmalig verwendet werden. Es kann sich nur in einem Space, mit einer Anzahl von 1, befinden."
    >
      Einzigartig
    </FormCheckbox>
  </ApiForm>
  <ErrorModal
    v-model:open="modal.isOpen.value"
    title="Produkt konnte nicht erstellt werden."
    :errors="modal.errors.value"
  />
</template>
