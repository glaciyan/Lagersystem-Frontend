<script lang="ts" setup>
import ApiForm from "~/components/Form/ApiForm.vue";
import { endpoints } from "~/lib/api/config/endpoints";
import FormInputTextArea from "~/components/Form/FormInputTextArea.vue";
import FormInput from "~/components/Form/FormInput.vue";
import FormInputNumber from "~/components/Form/FormInputNumber.vue";
import { Button, Divider } from "ant-design-vue";

const props = defineProps<{
  storageId: string; // Pflichtprop (weil kein `?` verwendet wird)
}>();

const emit = defineEmits(["success"]);
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
        @click="$router.go(-1)"
      >
        ✕
      </Button>
    </div>
    <ApiForm
      :endpoint="endpoints.postSpace"
      :initialState="{ name: '', totalSize: 5, unit: '', description: '', storageId: props.storageId }"
      @success="(data) => { console.log(data); emit('success') }"
      @failure="(err) => console.log(err)"
    >
      <Divider>
        Name for the spaces
      </Divider>
      <FormInput
        for="name"
        placeholder="Please enter the name of the Space"
      />
      <Divider>
        Size for the space:
      </Divider>
      <FormInputNumber
        for="totalSize"
        placeholder="Please enter the size of the space"
      />
      <Divider>
        Unit for the space:
      </Divider>
      <FormInput
        for="unit"
        placeholder="Please enter the unit of the space"
      />
      <Divider>
        Description
      </Divider>
      <FormInputTextArea
        for="description"
        placeholder="Please enter the description for the space"
      />
      <Button
        htmlType="submit"
        type="primary"
      >
        Create Space
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
