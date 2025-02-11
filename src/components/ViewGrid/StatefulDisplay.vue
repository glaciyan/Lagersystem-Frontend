<script setup lang="ts">
import LayoutVertical from "~/components/LayoutVertical.vue";
import { Empty, Result, Spin } from "ant-design-vue";
import { ApiError } from "~/lib/api/core";
import ReloadButton from "../Buttons/ReloadButton.vue";
import ErrorDisplay from "../ErrorDisplay.vue";

const props = defineProps<{ dataLength?: number; errors: ApiError[] | null; loading: boolean; aborted: boolean; refetch?: (() => void); emptyText?: string; noBorder?: boolean }>();
</script>

<template>
  <div :class="['p-8', {'w-full border border-dark-100 rounded-lg ': !noBorder}]">
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
          <!-- TODO replace with IconButton -->
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
    <ErrorDisplay
      v-else-if="props.errors"
      :errors
      :refetch
    />

    <LayoutVertical v-else>
      <!-- WE GOT DATA -->
      <slot name="header" />

      <div v-if="(dataLength ?? 0) > 0">
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
