<script lang="ts" setup>
import DividerHo from "~/components/LSy/DividerHo.vue";
import ApiForm from "~/components/Form/ApiForm.vue";
import { endpoints } from "~/lib/api/config/endpoints";
import FormInputTextArea from "~/components/Form/FormInputTextArea.vue";
import FormInput from "~/components/Form/FormInput.vue";
import { useIndexState } from "~/stores/IndexState.ts";

const indexStore = useIndexState();

// Funktion, um die Komponente zu aktualisieren
const triggerUpdate = () => {
  indexStore.triggerUpdate();
  indexStore.toggleCreateDepot();
};

</script>

<template>
  <div class="form-container">
    <DividerHo />
    <div class="header">
      <a-button
        type="text"
        class="close-button"
        @click="indexStore.toggleCreateDepot"
      >
        ✕
      </a-button>
    </div>
    <ApiForm
      :endpoint="endpoints.postStorage"
      :initialState="{ name: '', description: '' }"
      @success="(data) => {triggerUpdate(); console.log(data);}"
      @failure="(err) => console.log(err)"
    >
      <a-divider>
        Name des Depots:
      </a-divider>
      <FormInput for="name" />
      <a-divider>
        Description
      </a-divider>
      <FormInputTextArea for="description" />
      <a-button
        htmlType="submit"
        type="primary"
      >
        Submit
      </a-button>
    </ApiForm>
    <DividerHo />
  </div>
</template>

<style scoped>
.form-container {
  max-width: 400px; /* Optional: Begrenze die Breite */
  margin: 0 auto; /* Zentriere das Formular */
  padding: 20px;
  position: relative;
}

.header {
  display: flex;
  justify-content: flex-end; /* Rechtsbündig */
  margin-bottom: 8px;
}

.close-button {
  font-size: 16px;
  color: #ff4d4f;
  cursor: pointer;
}
</style>
