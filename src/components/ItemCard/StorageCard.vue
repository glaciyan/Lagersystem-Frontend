<script setup lang="ts">
import { RouterLink } from "vue-router";
import { z } from "zod";
import DeleteIcon from "~/icons/DeleteIcon.vue";
import EditIcon from "~/icons/EditIcon.vue";
import { api } from "~/lib/api/api";
import { endpoints } from "~/lib/api/config/endpoints";
import { match } from "~/lib/api/match";
import { Storage } from "~/lib/api/types";
import { notification } from "ant-design-vue";

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
  <div
    class="group min-w-[16rem] flex flex-col items-stretch justify-between rounded-md ring-1 ring-dark-1 transition-shadow hover:cursor-pointer hover:ring-1 hover:ring-cyan"
  >
    <RouterLink
      :to="`/storage/${props.storage.id}`"
    >
      <p class="m-0 overflow-hidden text-ellipsis border-b border-dark-1 px-3 py-2 text-lg text-light-1">
        {{ props.storage.name }}
      </p>
      <p
        class="overflow-hidden text-ellipsis px-3 py-2 text-base text-light-9"
      >
        {{ props.storage.description }}
      </p>
    </RouterLink>
    <div class="h-[2.5rem] w-full flex flex-row items-stretch self-end border-t border-dark-1 opacity-0 transition-all group-hover:opacity-100">
      <button class="w-full overflow-hidden border-r border-dark-1 transition-colors">
        <!-- TODO this should lead to the edit page? -->
        <RouterLink :to="`/storage/${props.storage.id}`">
          <div class="flex items-center justify-center gap-2 text-base text-gray-4 line-through hover:text-blue">
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
