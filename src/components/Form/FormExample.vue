<script setup lang="ts">
import { form } from "~/components/Form/form";
import FormInput from "~/components/Form/FormInput.vue";
import FormManager from "~/components/Form/FormManager.vue";
import LinkedForm from "~/components/Form/LinkedForm.vue";

// Initialize form data
const init = { title: "", num: 0, picked: "" };
const inputForm = form<typeof init>();

const submitted = ref("");
</script>

<template>
  <div class="mx-auto max-w-md rounded-lg bg-white p-6 shadow-md">
    <FormManager
      v-model="inputForm"
      :initialValues="init"
      :validation="(values, errors) => {
        if (values.title.length < 3) {
          errors.title = 'Title is too short!';
        }
      }"
      @submit="(values) => { console.log(values); submitted = JSON.stringify(values) }"
    >
      <div class="mb-4 text-gray-700">
        <strong>Current Title Value:</strong> {{ inputForm.values?.title }}
      </div>
      <LinkedForm class="space-y-4">
        <div>
          <label
            for="title"
            class="mb-1 block text-sm text-gray-700 font-medium"
          >
            Title
          </label>
          <FormInput
            for="title"
            type="text"
            class="w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          />
        </div>
        <div>
          <label
            class="mb-1 block text-sm text-gray-700 font-medium"
          >
            Number
          </label>
          <FormInput
            for="num"
            type="number"
            class="w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          />
        </div>
        <fieldset class="space-y-2">
          <legend class="text-sm text-gray-700 font-medium">
            Pick an option:
          </legend>
          <div class="flex items-center">
            <label class="text-gray-700">
              <FormInput
                for="picked"
                type="radio"
                value="One"
                name="group1"
                class="mr-2"
              />
              One</label>
          </div>
          <div class="flex items-center">
            <label class="text-gray-700">
              <FormInput
                for="picked"
                type="radio"
                value="Two"
                name="group1"
                class="mr-2"
              />
              Two</label>
          </div>
        </fieldset>
        <button
          type="submit"
          class="w-full rounded-md bg-indigo-600 px-4 py-2 text-white font-medium hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </LinkedForm>
      <div
        v-if="inputForm.errors?.title"
        class="mt-4 text-sm text-red-600"
      >
        {{ inputForm.errors.title }}
      </div>
      <div class="mt-4 text-sm text-gray-700">
        Sent data: {{ submitted.length > 0 ? submitted : "Nothing." }}
      </div>
    </FormManager>
  </div>
</template>
