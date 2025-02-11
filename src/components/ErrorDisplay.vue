<script setup lang="ts">
import { ApiError } from "~/lib/api/core";
import LayoutVertical from "./LayoutVertical.vue";
import { Result } from "ant-design-vue";
import ReloadButton from "./Buttons/ReloadButton.vue";
import ClosedCircle from "~/icons/ClosedCircle.vue";

const props = defineProps<{ errors: ApiError[] | null; refetch?: (() => void) }>();
</script>

<template>
  <LayoutVertical
    align="center"
  >
    <Result
      status="error"
      title="Es gab Fehler bei der Anfrage."
    >
      <template #extra>
        <ReloadButton :refetch="props.refetch" />
        <LayoutVertical
          class="my-6 rounded-md bg-dark-6 p-6"
        >
          <div
            v-for="error in props.errors"
            :key="error.context + error.type"
            class="flex content-center gap-2"
          >
            <ClosedCircle class="text-red" />
            <p class="m-0">
              {{ error.type }}: {{ error.message }}
            </p>
          </div>
        </LayoutVertical>
      </template>
    </Result>
  </LayoutVertical>
</template>
