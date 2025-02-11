<script setup lang="ts">
import { z } from "zod";
import { api } from "~/lib/api/api";
import { endpoints } from "~/api/endpoints";
import { match } from "~/lib/api/match";
import { Space } from "~/api/types";
import { notification } from "ant-design-vue";
import TransparentCubeIcon from "~/icons/TransparentCubeIcon.vue";
import AbstractCard from "./AbstractCard.vue";

const props = defineProps<{ space: z.infer<typeof Space> }>();
const emit = defineEmits(["update", "open"]);

const handleDelete = async () => {
  const confirmDelete = confirm("Möchten Sie dieses Space wirklich löschen?");
  if (confirmDelete) {
    const result = await api(endpoints.deleteSpace, { params: { id: props.space.id } });
    match(result, {
      ok: () => {
        notification.success({
          message: "Erfolg",
          description: `Space ${props.space.id} gelöscht!`,
          duration: 3,
        });
        emit("update");
      },
      error: errors => notification.error({
        message: "Fehler",
        description: `Space konnte nicht gelöscht werden: ${errors.map(err => err.message).join(", ")}`,
        duration: 7,
      }),
    });
  }
};
</script>

<template>
  <AbstractCard
    :item="props.space"
    :sizing="props.space"
    class="ring-1 ring-dark-1 hover:ring-2 hover:ring-cyan"
    @update="emit('update')"
    @open="emit('open')"
    @delete="handleDelete"
    @edit="notification.error({message: 'no'})"
  >
    <template #icon>
      <TransparentCubeIcon class="size-6" />
    </template>
  </AbstractCard>
</template>
