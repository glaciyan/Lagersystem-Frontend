<script setup lang="ts">
import { z } from "zod";
import { SearchResult } from "~/api/types";
import LBreadcrumb from "./LBreadcrumb.vue";
import TransparentCubeIcon from "~/icons/TransparentCubeIcon.vue";
import IconWithText from "./IconWithText.vue";
import FolderIcon from "~/icons/FolderIcon.vue";
import CubeIcon from "~/icons/CubeIcon.vue";

const props = defineProps<{ result: z.infer<typeof SearchResult> }>();
</script>

<template>
  <div class="my-4 flex flex-col gap-2 rounded-md px-4 py-4 ring-1 ring-dark-1">
    <IconWithText v-if="props.result.type === 'space'">
      <template #icon>
        <TransparentCubeIcon />
      </template>
      <span>{{ props.result.name }}</span>
      <span class="text-base text-gray-5">Space</span>
      <span class="text-sm text-gray-6">{{ props.result.id }}</span>
    </IconWithText>

    <IconWithText v-else-if="props.result.type === 'storages'">
      <template #icon>
        <FolderIcon />
      </template>
      <span>{{ props.result.name }}</span>
      <RouterLink :to="`/storage/${props.result.id}`">
        <span class="text-base text-gray-5">Storage</span>
        {{ " " }}
        <span class="text-sm text-gray-6">{{ props.result.id }}</span>
      </RouterLink>
    </IconWithText>

    <IconWithText v-else-if="props.result.type === 'product'">
      <template #icon>
        <CubeIcon />
      </template>
      <span>{{ props.result.name }}</span>
      <span class="text-base text-gray-5">Product</span>
      <span class="text-sm text-gray-6">{{ props.result.id }}</span>
    </IconWithText>

    <LBreadcrumb
      v-if="props.result.breadcrumb"
      :id="props.result.id"
      :breadcrumb="props.result.breadcrumb.entries"
    />

    <div class="mt-2 w-full flex justify-between justify-self-end">
      <div>
        <div class="text-base text-gray-3/90">
          {{ props.result.description }}
        </div>
      </div>
      <div class="text-sm text-gray-5">
        <div>
          Erstellt am {{ new Date(props.result.createdAt).toLocaleString("de-DE") }}
        </div>
        <div v-if="props.result.updatedAt">
          Letzte Bearbeitung am {{ new Date(props.result.updatedAt).toLocaleString("de-DE") }}
        </div>
      </div>
    </div>
  </div>
</template>
