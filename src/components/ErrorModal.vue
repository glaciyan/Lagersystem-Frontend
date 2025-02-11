<script setup lang="ts">
import { Modal } from "ant-design-vue";
import ClosedCircle from "~/icons/ClosedCircle.vue";
import { ApiError } from "~/lib/api/core";
import LayoutVertical from "./LayoutVertical.vue";
import IconWithText from "./IconWithText.vue";
import ExclamationCircleIcon from "~/icons/ExclamationCircleIcon.vue";

const props = defineProps<{ errors: ApiError[] | null; title: string }>();
const open = defineModel<boolean>("open", { required: true });

const restartApp = () => {
  window.location.href = "/";
};

const handleOk = () => {
  open.value = false;
};
</script>

<template>
  <Modal
    v-model:open="open"
    cancelText="Neu Starten"
    okText="Fehler Akzeptieren"
    :cancelButtonProps="{ danger: true, type: 'text' }"
    :okButtonProps="{ danger: true }"
    :closable="false"
    @cancel="restartApp"
    @ok="handleOk"
  >
    <template #title>
      <IconWithText>
        <template #icon>
          <ExclamationCircleIcon class="text-red" />
        </template>
        <span class="text-xl">Es gibt Fehler</span>
      </IconWithText>
    </template>
    <span>{{ props.title }}</span>
    <LayoutVertical
      v-if="errors"
      class="my-6 rounded-md bg-dark-3 p-6"
    >
      <div
        v-for="error in props.errors"
        :key="error.context + error.type"
        class="flex items-start gap-2"
      >
        <ClosedCircle class="mt-0.5 h-5 w-5 flex-shrink-0 text-red" />
        <p class="m-0 text-light-1">
          {{ error.type }}: {{ error.message }}
        </p>
      </div>
    </LayoutVertical>
  </Modal>
</template>
