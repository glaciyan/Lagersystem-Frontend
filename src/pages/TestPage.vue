<script setup lang="ts">
import FormInput from "~/components/Form/FormInput.vue";
import FormManager from "~/components/Form/FormManager.vue";
import LinkedForm from "~/components/Form/LinkedForm.vue";
</script>

<template>
  <FormManager
    :initialValues="{title: '', num: 0}"
    @submit="(values) => console.log(values)"
  >
    <LinkedForm>
      <FormInput
        for="title"
        type="text"
      />
      <FormInput
        for="num"
        type="number"
      />
      <button type="submit">
        Submit
      </button>
    </LinkedForm>
  </FormManager>
</template>
