<script setup lang="ts">
import { z } from "zod";
import { SearchResult } from "~/api/types";
import LBreadcrumb from "./LBreadcrumb.vue";
import TransparentCubeIcon from "~/icons/TransparentCubeIcon.vue";
import IconWithText from "./IconWithText.vue";
import FolderIcon from "~/icons/FolderIcon.vue";

const props = defineProps<{ result: z.infer<typeof SearchResult> }>();
</script>

<template>
  <div class="my-4 flex flex-col gap-2 rounded-md px-4 py-2 ring-1 ring-dark-1">
    <IconWithText v-if="props.result.type === 'space'">
      <template #icon>
        <TransparentCubeIcon />
      </template>
      Space
    </IconWithText>
    <IconWithText v-else-if="props.result.type === 'storage'">
      <template #icon>
        <FolderIcon />
      </template>
      Storage
    </IconWithText>

    <LBreadcrumb
      :id="props.result.id"
      :breadcrumb="props.result.breadcrumb.entries"
    />
  </div>
</template>
