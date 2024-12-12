<script lang="ts" setup>
import DividerHo from "~/components/LSy/DividerHo.vue";
import ApiForm from "~/components/Form/ApiForm.vue";
import { endpoints } from "~/lib/api/config/endpoints";
import FormInputTextArea from "~/components/Form/FormInputTextArea.vue";
import FormInput from "~/components/Form/FormInput.vue";
import { useIndexState } from "~/stores/IndexState.ts";
import { useRouter } from "vue-router";
import { Button, Divider } from "ant-design-vue";

const router = useRouter();

const indexStore = useIndexState();

// Funktion, um die Komponente zu aktualisieren
const triggerUpdate = () => {
  router.go(0);
  indexStore.toggleCreateDepot();
};

</script>

<template>
  <div
    class="form-container"
    style="padding: 0px"
  >
    <DividerHo />
    <div class="header">
      <Button
        type="text"
        class="close-button"
        @click="indexStore.toggleCreateDepot"
      >
        ✕
      </Button>
    </div>
    <ApiForm
      :endpoint="endpoints.postStorage"
      :initialState="{ name: '', description: '' }"
      @success="(data) => {triggerUpdate(); console.log(data);}"
      @failure="(err) => console.log(err)"
    >
      <Divider>
        Name des Depots:
      </Divider>
      <FormInput for="name" />
      <Divider>
        Description
      </Divider>
      <FormInputTextArea for="description" />
      <Button
        htmlType="submit"
        type="primary"
      >
        Submit
      </Button>
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
