<script setup lang="ts">
import { Button, Modal, notification } from "ant-design-vue";
import AssignProductForm from "~/components/Create/AssignProductForm.vue";
import PageContainer from "~/components/PageContainer";
import ClosedCircle from "~/icons/ClosedCircle.vue";
import { ApiError } from "~/lib/api/core";
import LayoutVertical from "~/components/LayoutVertical.vue";
import ReturnIcon from "~/icons/ReturnIcon.vue";

const route = useRoute();
const origin = ref(route.query.origin as string);
watch(() => route.query.origin, (newOrigin) => {
  origin.value = newOrigin as string;
});
const showErrorModal = ref(false);
const resultErrors = ref<ApiError[]>([]);
</script>

<template>
  <PageContainer>
    <RouterLink :to="`/storage/${$route.query.origin}`">
      <Button>
        <div class="flex flex-wrap items-center justify-center gap-2">
          <ReturnIcon />
          Zurück
        </div>
      </Button>
    </RouterLink>
    <AssignProductForm
      :storageId="origin"
      @success="async (data) => {
        notification.success({
          message: 'Erfolg',
          description: `Produkt erfolgreich zugewiesen: ${data.productName}`,
          duration: 3,
        });
        return $router.push(`/storage/${$route.query.origin}`);
      }"
      @fail="(errors) => {
        notification.error({
          message: 'Fehler',
          description: 'Das Produkt konnte nicht zugewiesen werden.',
          duration: 3,
        });
        showErrorModal = true;
        resultErrors = errors;
      }"
    />
  </PageContainer>
  <Modal
    v-model:open="showErrorModal"
    title="Error"
    :footer="null"
  >
    Das Produkt konnte nicht zugewiesen werden.
    <LayoutVertical
      class="my-6 rounded-md bg-dark-3 p-6"
    >
      <div
        v-for="error in resultErrors"
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
