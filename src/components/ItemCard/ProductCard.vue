<script setup lang="ts">
import { z } from "zod";
import { api } from "~/lib/api/api";
import { endpoints } from "~/api/endpoints";
import { match } from "~/lib/api/match";
import { Product } from "~/api/types";
import { notification } from "ant-design-vue";
import AbstractCard from "./AbstractCard.vue";

const props = defineProps<{ product: z.infer<typeof Product>; displayOnly?: boolean }>();
const emit = defineEmits(["update", "open"]);

const handleDelete = async () => {
  const confirmDelete = confirm("Möchten Sie dieses Produkt wirklich löschen?");
  if (confirmDelete) {
    const result = await api(endpoints.deleteProduct, { params: { id: props.product.id } });
    match(result, {
      ok: () => {
        notification.success({
          message: "Erfolg",
          description: `Produkt ${props.product.id} gelöscht!`,
          duration: 3,
        });
        emit("update");
      },
      error: errors => notification.error({
        message: "Fehler",
        description: `Produkt konnte nicht gelöscht werden: ${errors.map(err => err.message).join(", ")}`,
        duration: 7,
      }),
    });
  }
};
</script>

<template>
  <AbstractCard
    type="product"
    :item="props.product"
    :sizing="props.product"
    class="ring-1 ring-dark-1 hover:ring-1 hover:ring-cyan"
    @update="emit('update')"
    @open="emit('open')"
    @delete="handleDelete"
    @edit="notification.error({message: 'no'})"
  />
</template>
