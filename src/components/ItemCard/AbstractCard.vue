<script setup lang="ts">
import DeleteIcon from "~/icons/DeleteIcon.vue";
import EditIcon from "~/icons/EditIcon.vue";
import { Progress } from "ant-design-vue";
import { scrollToAndMarkElement } from "~/lib/scrollToAndMarkElement";
import { Product } from "~/api/types";
import { z } from "zod";
import IconWithText from "../IconWithText.vue";

const props = defineProps<{ item: { id: string; name: string; description: string }; sizing?: { currentSize: number; unit?: string; totalSize: number }; products?: z.infer<typeof Product>[] }>();
const emit = defineEmits(["update", "open", "edit", "delete"]);

const el = useTemplateRef<HTMLDivElement>("root");

const refferer = inject("refferer") as Ref<string>;
onMounted(() => {
  if (refferer && refferer.value === props.item.id && el.value !== null) {
    scrollToAndMarkElement(el.value);
  }
});
</script>

<template>
  <div
    ref="el"
    class="group flex basis-[auto] flex-col items-stretch justify-between rounded-md transition-shadow hover:cursor-pointer"
    :l-data-id="props.item.id"
  >
    <div @click="emit('open')">
      <IconWithText class="m-0 flex gap-2 border-b border-dark-1 px-3 py-2 text-lg text-light-7 !justify-start">
        <template #icon>
          <slot name="icon" />
        </template>
        <span class="overflow-hidden text-ellipsis">{{ props.item.name }}</span>
      </IconWithText>
      <div
        v-if="props.sizing"
        class="m-0 overflow-hidden text-ellipsis border-b border-dark-1 px-3 py-2 text-lg text-light-7"
      >
        <span v-if="props.products">Produkte: {{ props.products.length }}</span>
        <span class="px-3 text-base text-light-9">
          {{ props.sizing.currentSize }}{{ props.sizing.unit }}/{{ props.sizing.totalSize }}{{ props.sizing.unit }}
        </span>
        <div class="min-w-[10rem]">
          <Progress :percent="Math.round(props.sizing.currentSize/props.sizing.totalSize * 100)" />
        </div>
      </div>
      <p
        v-if="props.item.description"
        class="overflow-hidden text-ellipsis px-3 py-2 text-base text-light-9"
      >
        {{ props.item.description }}
      </p>
    </div>
    <div class="flex justify-around border-t border-dark-1 opacity-0 transition-all group-hover:opacity-100">
      <button
        class="w-full border-r border-dark-2 px-3 py-2 text-base text-gray-4 transition-colors hover:text-blue"
        @click="emit('edit')"
      >
        <IconWithText center>
          <template #icon>
            <EditIcon class="size-4" />
          </template>
        </IconWithText>
      </button>
      <button
        class="w-full px-2 text-base text-gray-4 transition-colors hover:text-red"
        @click="emit('delete')"
      >
        <IconWithText center>
          <template #icon>
            <DeleteIcon class="size-4" />
          </template>
        </IconWithText>
      </button>
    </div>
  </div>
</template>
