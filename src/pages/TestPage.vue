<script setup lang="ts">
import { form } from "~/components/Form/form";
import FormInput from "~/components/Form/FormInput.vue";
import FormManager from "~/components/Form/FormManager.vue";
import LinkedForm from "~/components/Form/LinkedForm.vue";

const init = { title: "", num: 0, picked: "" };
const inputForm = form<typeof init>();
</script>

<template>
  <FormManager
    v-model="inputForm"
    :initialValues="init"
    :validation="(values, errors) => {
      if (values.title.length < 3) {
        errors.title = 'Title is too short!';
      }
    }"
    @submit="(values) => console.log(values)"
  >
    <div>
      {{ inputForm.values?.title }}
    </div>
    <LinkedForm>
      <FormInput
        for="title"
        type="text"
      />
      <FormInput
        for="num"
        type="number"
      />
      <label>
        <FormInput
          for="picked"
          type="radio"
          value="One"
          name="group1"
        />
        One
      </label>
      <label>
        <FormInput
          for="picked"
          type="radio"
          value="Two"
          name="group1"
        />
        Two
      </label>
      <button type="submit">
        Submit
      </button>
    </LinkedForm>
    <div v-if="inputForm.errors?.title">
      {{ inputForm.errors.title }}
    </div>
  </FormManager>
</template>
