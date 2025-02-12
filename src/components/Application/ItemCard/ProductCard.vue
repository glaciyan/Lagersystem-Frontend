<script setup lang="ts">
import { z } from "zod";
import { api } from "~/lib/api/api";
import { endpoints } from "~/api/endpoints";
import { Product } from "~/api/types";
import { notification } from "ant-design-vue";
import AbstractCard from "./AbstractCard.vue";
import { postAndForget } from "~/api/postAndForget";

const props = defineProps<{ product: z.infer<typeof Product>; displayOnly?: boolean }>();
const emit = defineEmits(["update", "open"]);

const handleDelete = async () => {
  await postAndForget({
    apiCall: () => api(endpoints.deleteProduct, { params: { id: props.product.id } }),
    onSuccess: () => emit("update"),
    successMessage: `Produkt ${props.product.id} gelöscht!`,
    errorMessage: errors => `Produkt konnte nicht gelöscht werden: ${errors.map(err => err.message).join(", ")}`,
  });
};
</script>

<template>
  <AbstractCard
    type="product"
    :item="props.product"
    :sizing="props.product"
    class="ring-1 ring-dark-1 hover:ring-1 hover:ring-cyan"
    :deleteConfig="{
      title: 'Wollen sie dieses Produkt wirklick löschen?',
      onDelete: handleDelete
    }"
    @open="emit('open')"
    @edit="notification.error({message: 'no'})"
  />
</template>
