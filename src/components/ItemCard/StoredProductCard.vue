<script setup lang="ts">
import { z } from "zod";
import AbstractCard from "./AbstractCard.vue";
import { Space, StoredProduct } from "~/api/types";
import { Button, Modal, notification, Popconfirm } from "ant-design-vue";
import IconWithText from "../IconWithText.vue";
import DeleteIcon from "~/icons/DeleteIcon.vue";
import InfoIcon from "~/icons/InfoIcon.vue";
import ApiForm from "../Form/ApiForm.vue";
import { endpoints } from "~/api/endpoints";
import FormInputInteger from "../Form/Input/FormInputInteger.vue";
import LayoutVertical from "../LayoutVertical.vue";
import LayoutHorizontal from "../LayoutHorizontal.vue";
import { postAndForget } from "~/api/postAndForget";
import { api } from "~/lib/api/api";

const props = defineProps<{ product: z.infer<typeof StoredProduct>; space: z.infer<typeof Space> }>();
const emit = defineEmits(["open", "update"]);

const handleDelete = async () => {
  await postAndForget({
    apiCall: () => api(endpoints.deleteStoredProducts, { params: { id: props.product.id } }),
    onSuccess: () => emit("update"),
    successMessage: `Produkt ${props.product.id} gelöscht!`,
    errorMessage: errors => `Produkt konnte nicht gelöscht werden: ${errors.map(err => err.message).join(", ")}`,
  });
};

const modalOpen = ref(false);
</script>

<template>
  <AbstractCard
    noEdit
    type="product"
    :item="props.product"
    :sizing="props.product"
    class="ring-1 ring-dark-1 hover:ring-1 hover:ring-cyan"
    @open="emit('open')"
  >
    <template #customActions>
      <Popconfirm
        title="Möchten Sie alle Produkte aus dem Space entfernen oder nur die Menge reduzieren?"
        okText="Entfernen"
        cancelText="Reduzieren"
        color="hsl(0, 0%, 14%)"
        overlayClassName="max-w-[24rem]"
        :okButtonProps="{ danger: true, size: 'middle'}"
        :cancelButtonProps="{size: 'middle', type: 'dashed'}"
        @confirm="handleDelete"
        @cancel="() => {
          modalOpen = true;
        }"
      >
        <template #icon>
          <InfoIcon class="text-blue" />
        </template>
        <button
          class="w-full px-2 py-2 text-base text-gray-4 transition-colors hover:text-red"
        >
          <IconWithText center>
            <template #icon>
              <DeleteIcon class="size-4" />
            </template>
          </IconWithText>
        </button>
      </Popconfirm>
    </template>
  </AbstractCard>
  <Modal
    v-model:open="modalOpen"
    title="Menge Verändern"
    :footer="null"
  >
    <ApiForm
      :endpoint="endpoints.updateStoredProduct"
      :params="{id: props.product.id}"
      :initialState="{quantity: props.product.quantity}"
      @success="() => {
        modalOpen = false;
        notification.success({message: 'Menge Verändert'})
        emit('update')
      }"
    >
      <LayoutVertical>
        <FormInputInteger
          for="quantity"
          :min="1"
        />
        <LayoutHorizontal class="self-end">
          <Button @click="modalOpen = false">
            Cancel
          </Button>
          <Button
            htmlType="submit"
            type="primary"
          >
            OK
          </Button>
        </LayoutHorizontal>
      </LayoutVertical>
    </ApiForm>
  </Modal>
</template>
