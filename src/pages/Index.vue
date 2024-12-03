<script setup lang="ts">
import PageContainer from "~/components/PageContainer";
import GButton from "~/components/Button/BaseButton.vue";
import ApiForm from "~/components/Form/ApiForm.vue";
import { endpoints } from "~/lib/api/config/endpoints";
import FormInput from "~/components/Form/FormInput.vue";
import { Button } from "ant-design-vue";
</script>

<template>
  <PageContainer>
    <GButton
      label="hello"
    />
    <GButton
      label="Hello Loading"
      loadingPosition="left"
    />
  </PageContainer>
  <ApiForm
    :endpoint="endpoints.postStorage"
    :initialState="{ name: 'My Name is', description: 'Description 1010101' }"
    @success="(data) => console.log('worked', data)"
    @failure="(err) => console.log('failed', err)"
  >
    <FormInput
      for="name"
      type="text"
    />
    <FormInput
      for="description"
      type="text"
    />
    <Button htmlType="submit">
      Submit
    </Button>
  </ApiForm>
</template>
