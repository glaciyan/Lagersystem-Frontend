<script setup lang="ts">
import { z } from "zod";
import AbstractCard from "./AbstractCard.vue";
import { Space, StoredProduct, StoredProductFromSpace } from "~/api/types";
import { Modal, notification, Popconfirm } from "ant-design-vue";
import IconWithText from "~/components/IconWithText.vue";
import DeleteIcon from "~/icons/DeleteIcon.vue";
import InfoIcon from "~/icons/InfoIcon.vue";
import ApiForm from "~/components/Form/ApiForm.vue";
import { endpoints } from "~/api/endpoints";
import FormInputInteger from "~/components/Form/Input/FormInputInteger.vue";
import LayoutVertical from "~/components/LayoutVertical.vue";
import { postAndForget } from "~/api/postAndForget";
import { api } from "~/lib/api/api";
import { useModal } from "~/composites/useModal";
import EditIcon from "~/icons/EditIcon.vue";
import { emitter } from "~/eventBus";

type Stored = z.infer<typeof StoredProduct>;
type StoredFSpace = z.infer<typeof StoredProductFromSpace>;
type OR = Stored | StoredFSpace;
type AND = Stored & StoredFSpace;
type Result = Partial<AND> & Pick<OR, keyof OR>;

const props = defineProps<{ product: Result; space: z.infer<typeof Space> }>();
const emit = defineEmits(["open", "update"]);

const handleDelete = async () => {
  await postAndForget({
    apiCall: () => api(endpoints.deleteStoredProducts, { params: { id: props.product.id } }),
    onSuccess: () => emitter.emit("productUpdate", null),
    successMessage: `Produkt ${props.product.id} gelöscht!`,
    errorMessage: errors => `Produkt konnte nicht gelöscht werden: ${errors.map(err => err.message).join(", ")}`,
  });
};

const changeQuantityModal = useModal();

const normalProduct = computed(() => ({
  name: props.product.productName ?? props.product.name!,
  id: props.product.id,
  description: props.product.productDescription ?? props.product.description!,
}));
</script>

<template>
  <AbstractCard
    noPointer
    noEdit
    type="product"
    :item="normalProduct"
    :sizing="props.product"
    class="bg-dark-9 ring-1 ring-dark-1 hover:ring-1 hover:ring-gray-7"
    @open="emit('open')"
  >
    <template #customActions>
      <button
        class="w-full border-r border-dark-2 px-3 py-2 text-base text-gray-4 transition-colors hover:text-blue"
        @click="changeQuantityModal.open()"
      >
        <IconWithText center>
          <template #icon>
            <EditIcon class="size-4" />
          </template>
        </IconWithText>
      </button>
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
          changeQuantityModal.open()
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
    v-model:open="changeQuantityModal.isOpen.value"
    title="Menge Verändern"
    :footer="null"
    destroyOnClose
  >
    <ApiForm
      :endpoint="endpoints.updateStoredProduct"
      :params="{id: props.product.id}"
      :initialState="{quantity: props.product.quantity}"
      :validation="(values, errors) => {
        if (values.quantity <= 0) {
          errors.quantity = {
            message: 'Menge kann nicht kleiner oder gleich 0 sein',
            type: 'error'
          }
        }
      }"
      cancelText="Abbrechen"
      submitText="OK"
      @success="() => {
        changeQuantityModal.close();
        notification.success({ message: 'Menge Verändert' });
        emitter.emit('storageUpdate', null);
        emit('update');
      }"
      @cancel="changeQuantityModal.close()"
      @failure="(errors) => notification.error({message: errors.map(e => e.message).join(', ')})"
    >
      <LayoutVertical>
        <FormInputInteger
          for="quantity"
          :min="1"
        />
      </LayoutVertical>
    </ApiForm>
  </Modal>
</template>
