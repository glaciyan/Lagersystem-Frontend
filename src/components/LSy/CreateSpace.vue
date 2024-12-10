<script lang="ts" setup>
import ApiForm from "~/components/Form/ApiForm.vue";
import { endpoints } from "~/lib/api/config/endpoints";
import FormInputTextArea from "~/components/Form/FormInputTextArea.vue";
import FormInput from "~/components/Form/FormInput.vue";
import { useDepotState } from "~/stores/DepotState.ts";

const depotStore = useDepotState();

// Define props
const props = defineProps({
  storageId: {
    type: String,
    required: true,
  },
});

const triggerUpdate = () => {
  depotStore.triggerUpdate();
  depotStore.toggleCreateStorage();
};

const initialState = {
  name: "",
  size: 0.1,
  description: "",
  storageId: props.storageId, // message wird hier als parentID gesetzt
};

console.log("Initial State:", initialState);

</script>

<template>
  <div class="form-container">
    <div class="header">
      <a-button
        type="text"
        class="close-button"
        @click="depotStore.toggleCreateSpace"
      >
        ✕
      </a-button>
    </div>
    <ApiForm
      :endpoint="endpoints.postSpace"
      :initialState="initialState"
      @success="(data) => {triggerUpdate(); console.log(data);}"
      @failure="(err) => console.log(err)"
    >
      <a-divider>
        Name for the space:
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
