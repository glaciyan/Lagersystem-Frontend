<script setup lang="ts">
import { z } from "zod";
import { api } from "~/lib/api/api";
import { endpoints } from "~/api/endpoints";
import { Storage } from "~/api/types";
import { notification } from "ant-design-vue";
import FolderIcon from "~/icons/FolderIcon.vue";
import AbstractCard from "./AbstractCard.vue";
import { postAndForget } from "~/api/postAndForget";

const props = defineProps<{ storage: z.infer<typeof Storage> }>();
const emit = defineEmits(["update"]);

const handleDelete = async () => {
  await postAndForget({
    apiCall: () => api(endpoints.deleteStorage, { params: { id: props.storage.id } }),
    onSuccess: () => emit("update"),
    successMessage: `Storage ${props.storage.id} gelöscht!`,
    errorMessage: errors => `Storage konnte nicht gelöscht werden: ${errors.map(err => err.message).join(", ")}`,
  });
};
</script>

<template>
  <AbstractCard
    deleteTitle="Wollen sie dieses Storage wirklick löschen?"
    type="storage"
    :item="props.storage"
    class="bg-dark-8/80 ring ring-offset-3 ring-dark-1 ring-offset-dark-4 hover:ring-offset-amber"
    :deleteConfig="{
      title: 'Wollen sie dieses Storage wirklick löschen?',
      onDelete: handleDelete
    }"
    @open="$router.push(`/storage/${props.storage.id}`)"
    @edit="notification.error({message: 'no'})"
  >
    <template #icon>
      <FolderIcon />
    </template>
  </AbstractCard>
</template>
