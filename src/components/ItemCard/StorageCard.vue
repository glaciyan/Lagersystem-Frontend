<script setup lang="ts">
import { z } from "zod";
import { api } from "~/lib/api/api";
import { endpoints } from "~/api/endpoints";
import { match } from "~/lib/api/match";
import { Storage } from "~/api/types";
import { notification } from "ant-design-vue";
import FolderIcon from "~/icons/FolderIcon.vue";
import AbstractCard from "./AbstractCard.vue";

const props = defineProps<{ storage: z.infer<typeof Storage> }>();
const emit = defineEmits(["update"]);

const handleDelete = async () => {
  const confirmDelete = confirm("Möchten Sie dieses Storage wirklich löschen?");
  if (confirmDelete) {
    const result = await api(endpoints.deleteStorage, { params: { id: props.storage.id } });
    match(result, {
      ok: () => {
        notification.success({
          message: "Erfolg",
          description: `Storage ${props.storage.id} gelöscht!`,
          duration: 3,
        });
        emit("update");
      },
      error: errors => notification.error({
        message: "Fehler",
        description: `Storage konnte nicht gelöscht werden: ${errors.map(err => err.message).join(", ")}`,
        duration: 7,
      }),
    });
  }
};
</script>

<template>
  <AbstractCard
    type="storage"
    :item="props.storage"
    class="bg-dark-8/80 ring ring-offset-3 ring-dark-1 ring-offset-dark-4 hover:ring-offset-amber"
    @update="emit('update')"
    @open="$router.push(`/storage/${props.storage.id}`)"
    @delete="handleDelete"
    @edit="notification.error({message: 'no'})"
  >
    <template #icon>
      <FolderIcon />
    </template>
  </AbstractCard>
</template>
