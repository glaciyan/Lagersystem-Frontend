<script lang="ts" setup>
import ApiForm from "~/components/Form/ApiForm.vue";
import { endpoints } from "~/lib/api/config/endpoints";
import FormInputTextArea from "~/components/Form/FormInputTextArea.vue";
import FormInput from "~/components/Form/FormInput.vue";
import { Button, Divider } from "ant-design-vue";

const props = defineProps<{
  parentId: string; // Pflichtprop (weil kein `?` verwendet wird)
}>();

const emit = defineEmits(["triggerUpdate"]);
function handleButtonCLick() {
  emit("triggerUpdate");
}
</script>

<template>
  <div
    class="form-container"
    style="padding-top: 0px"
  >
    <div class="header">
      <Button
        type="text"
        class="close-button"
        @click="handleButtonCLick"
      >
        ✕
      </Button>
    </div>
    <ApiForm
      :endpoint="endpoints.postStorage"
      :initialState="{ name: '', description: '', parentId: props.parentId }"
      @success="(data) => { handleButtonCLick(); console.log(data); }"
      @failure="(err) => console.log(err)"
    >
      <Divider>
        Name for the storage:
      </Divider>
      <FormInput
        for="name"
        placeholder="Please enter the name of your storage"
      />
      <Divider>
        Description
      </Divider>
      <FormInputTextArea
        for="description"
        placeholder="Please enter the description"
      />
      <Button
        htmlType="submit"
        type="primary"
      >
        Create Storage
      </Button>
    </ApiForm>
  </div>
</template>

<style scoped>
.form-container {
  max-width: 400px;
  /* Optional: Begrenze die Breite */
  margin: 0 auto;
  /* Zentriere das Formular */
  padding: 20px;
  position: relative;
}

.header {
  display: flex;
  justify-content: flex-end;
  /* Rechtsbündig */
  margin-bottom: 8px;
}

.close-button {
  font-size: 16px;
  color: #ff4d4f;
  cursor: pointer;
}
</style>
