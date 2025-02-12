<script setup lang="ts">
import { z } from "zod";
import { api } from "~/lib/api/api";
import { endpoints } from "~/api/endpoints";
import { Space } from "~/api/types";
import TransparentCubeIcon from "~/icons/TransparentCubeIcon.vue";
import AbstractCard from "./AbstractCard.vue";
import { postAndForget } from "~/api/postAndForget";
import { useUpdateSpaceModal } from "~/stores/modals";
import { emitter } from "~/eventBus";

const props = defineProps<{ space: z.infer<typeof Space> }>();
const emit = defineEmits(["open"]);

const handleDelete = async () => {
  await postAndForget({
    apiCall: () => api(endpoints.deleteSpace, { params: { id: props.space.id } }),
    onSuccess: () => emitter.emit("spaceUpdate", null),
    successMessage: `Space ${props.space.id} gelöscht!`,
    errorMessage: errors => `Space konnte nicht gelöscht werden: ${errors.map(err => err.message).join(", ")}`,
  });
};

const updateSpaceModal = useUpdateSpaceModal();
</script>

<template>
  <AbstractCard
    type="space"
    deleteTitle="Wollen sie dieses Space wirklick löschen?"
    :item="props.space"
    :capacity="props.space"
    class="ring-1 ring-dark-1 hover:ring-2 hover:ring-cyan"
    :deleteConfig="{
      title: 'Wollen sie dieses Space wirklick löschen?',
      onDelete: handleDelete
    }"

    @open="emit('open')"
    @edit="updateSpaceModal.open(props.space)"
  >
    <template #icon>
      <TransparentCubeIcon class="size-6" />
    </template>
  </AbstractCard>
</template>
