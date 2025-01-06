<script setup lang="ts">
import { RouterLink } from "vue-router";
import { z } from "zod";
import DeleteIcon from "~/icons/DeleteIcon.vue";
import EditIcon from "~/icons/EditIcon.vue";
import { api } from "~/lib/api/api";
import { endpoints } from "~/lib/api/config/endpoints";
import { match } from "~/lib/api/match";
import { Product } from "~/lib/api/types";
import { notification } from "ant-design-vue";

const props = defineProps<{ product: z.infer<typeof Product> }>();
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
  <div
    class="group min-w-[16rem] flex flex-col items-stretch justify-between rounded-md ring-1 ring-dark-1 transition-shadow hover:cursor-pointer hover:ring-1 hover:ring-cyan"
  >
    <div @click="emit('open')">
      <div class="m-0 overflow-hidden text-ellipsis border-b border-dark-1 px-3 py-2 text-lg text-light-1">
        {{ props.product.name }}
        <span class="px-3 text-base text-light-9">
          Größe: {{ props.product.size }}{{ props.product.unit }}
        </span>
      </div>
      <p
        v-if="props.product.description"
        class="overflow-hidden text-ellipsis px-3 py-2 text-base text-light-9"
      >
        {{ props.product.description }}
      </p>
    </div>
    <div class="h-[2.5rem] w-full flex flex-row items-stretch self-end border-t border-dark-1 opacity-0 transition-all group-hover:opacity-100">
      <button class="w-full overflow-hidden border-r border-dark-1 transition-colors">
        <!-- TODO this should lead to the edit page? -->
        <RouterLink :to="`/product/${props.product.id}`">
          <div class="flex items-center justify-center gap-2 text-base text-gray-4 hover:text-blue">
            <EditIcon class="!size-4" />
            Bearbeiten
          </div>
        </RouterLink>
      </button>
      <button
        class="w-full transition-colors"
        @click="handleDelete"
      >
        <div
          class="flex items-center justify-center gap-2 text-base text-gray-4 hover:text-red"
        >
          <DeleteIcon class="!size-4" />
          Löschen
        </div>
      </button>
    </div>
  </div>
</template>
