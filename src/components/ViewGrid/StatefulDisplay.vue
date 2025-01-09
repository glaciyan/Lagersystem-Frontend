<script setup lang="ts">
import LayoutVertical from "~/components/LayoutVertical.vue";
import { Empty, Result, Spin } from "ant-design-vue";
import ClosedCircle from "~/icons/ClosedCircle.vue";
import { ApiError } from "~/lib/api/core";
import ReloadButton from "../Buttons/ReloadButton.vue";

const props = defineProps<{ data: any | any[] | null; errors: ApiError[] | null; loading: boolean; aborted: boolean; refetch?: (() => void); emptyText?: string }>();
</script>

<template>
  <div class="w-full border border-dark-100 rounded-lg p-8">
    <!-- ABORTED -->
    <LayoutVertical
      v-if="props.aborted"
      align="center"
    >
      <Result
        status="warning"
        title="Die Anfrage wurde abgebrochen."
      >
        <template #extra>
          <ReloadButton :refetch="props.refetch" />
        </template>
      </Result>
    </LayoutVertical>

    <!-- LOADING -->
    <LayoutVertical
      v-else-if="props.loading"
      align="center"
      justify="center"
      gap="middle"
    >
      <Spin size="large" />
      <!-- <Button
          danger
          @click="abort"
        >
          Abbrechen
        </Button> -->
    </LayoutVertical>

    <!-- ERRORS -->
    <LayoutVertical
      v-else-if="props.errors"
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

    <LayoutVertical v-else>
      <!-- WE GOT DATA -->
      <slot name="header" />

      <div v-if="props.data?.length">
        <slot name="display" />
      </div>

      <!-- EMPTY -->
      <LayoutVertical
        v-else
        align="center"
        class="w-full"
      >
        <LayoutVertical>
          <Empty :image="Empty.PRESENTED_IMAGE_SIMPLE">
            <template #description>
              <span class="text-light-5">
                {{ props.emptyText }}
              </span>
            </template>
          </Empty>
        </LayoutVertical>
      </LayoutVertical>
    </LayoutVertical>
  </div>
</template>
