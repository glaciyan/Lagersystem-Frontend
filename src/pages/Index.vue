<script setup lang="ts">
import PageContainer from "~/components/PageContainer";
import { Button } from "ant-design-vue";
import ApiForm from "~/components/Form/ApiForm.vue";
import { endpoints } from "~/lib/api/config/endpoints";
import FormInput from "~/components/Form/FormInput.vue";
</script>

<template>
  <PageContainer>
    Hello world.
    <Button type="primary">
      Hello World
    </Button>
    <ApiForm
      :endpoint="endpoints.postStorage"
      :initialState="{name: '', description: ''}"
    >
      <FormInput
        for="name"
        placeholder="Name"
      />
      <FormInput
        for="description"
        placeholder="Description"
      />
      <Button
        type="primary"
        htmlType="submit"
      >
        Submit
      </Button>
    </ApiForm>
  </PageContainer>
</template>
