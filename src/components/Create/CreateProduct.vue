<script lang="ts" setup>
import ApiForm from "~/components/Form/ApiForm.vue";
import { endpoints } from "~/api/endpoints";
import FormInputTextArea from "~/components/Form/FormInputTextArea.vue";
import FormInput from "~/components/Form/FormInput.vue";
import FormInputNumber from "~/components/Form/FormInputNumber.vue";
import { Button, Divider } from "ant-design-vue";

const emit = defineEmits(["success"]);

const loading = ref(false);
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
      :endpoint="endpoints.postProduct"
      :initialState="{ name: '', description: '', size: 0, unit: '' }"
      @success="(data) => { console.log(data); emit('success') }"
      @failure="(err) => console.log(err)"
      @loading="(state) => loading = state"
    >
      <Divider>
        Name for the product:
      </Divider>
      <FormInput
        for="name"
        placeholder="Please enter the name of the product"
      />
      <Divider>
        Size for the product:
      </Divider>
      <FormInputNumber
        for="size"
        placeholder="Please enter the size of the product"
      />
      <Divider>
        Unit for the product:
      </Divider>
      <FormInput
        for="unit"
        placeholder="Please enter the unit of the product"
      />
      <Divider>
        Description
      </Divider>
      <FormInputTextArea
        for="description"
        placeholder="Please enter the description for the product"
      />
      <Button
        htmlType="submit"
        type="primary"
        :loading
      >
        Create product
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
