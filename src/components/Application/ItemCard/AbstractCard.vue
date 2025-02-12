<script setup lang="ts">
import DeleteIcon from "~/icons/DeleteIcon.vue";
import EditIcon from "~/icons/EditIcon.vue";
import { Popconfirm, Progress } from "ant-design-vue";
import { scrollToAndMarkElement } from "~/lib/scrollToAndMarkElement";
import { Product } from "~/api/types";
import { z } from "zod";
import IconWithText from "~/components/IconWithText.vue";
import { formatUnit } from "~/lib/formatUnit";

const props = defineProps<{
  type: string;
  item: { id: string; name: string; description: string };
  capacity?: { currentSize: number; unit?: string; totalSize: number };
  unique?: boolean;
  sizing?: { size: number; unit?: string };
  products?: z.infer<typeof Product>[];
  noEdit?: boolean;
  noPointer?: boolean;
  deleteConfig?: { title: string; onDelete: () => Promise<void> };
}>();
const emit = defineEmits(["open", "edit"]);

const el = useTemplateRef<HTMLDivElement>("root");

const refferer = inject("refferer") as Ref<string>;
onMounted(() => {
  if (refferer && refferer.value === props.item.id && el.value !== null) {
    scrollToAndMarkElement(el.value, refferer.value);
  }
});
</script>

<template>
  <div
    ref="root"
    :class="['group flex basis-[auto] flex-col items-stretch justify-between rounded-md transition-shadow', {'hover:cursor-pointer': !noPointer}]"
    :l-data-id="props.item.id"
    :l-data-type="props.type"
    :l-data-capacity="(props.capacity?.totalSize ?? 0) - (props.capacity?.currentSize ?? 0)"
    :l-data-unit="props.capacity?.unit ?? props.sizing?.unit"
    :l-data-size="props.sizing?.size"
  >
    <div
      class="h-full"
      @click="emit('open')"
    >
      <div class="border-b border-dark-1 px-3 py-2">
        <IconWithText class="m-0 flex gap-2 text-lg text-light-7 !justify-start">
          <template
            v-if="$slots.icon"
            #icon
          >
            <slot name="icon" />
          </template>
          <div class="overflow-hidden text-ellipsis">
            {{ props.item.name }}
          </div>
        </IconWithText>
        <div
          v-if="unique"
          class="text-base text-[#447e89]"
        >
          Einzigartig
        </div>
      </div>
      <div
        v-if="props.sizing"
        class="px-3 pt-2 text-base text-gray-3/85"
      >
        Größe: {{ props.sizing.size }}{{ props.sizing.unit }}
      </div>
      <div
        v-if="props.capacity"
        class="m-0 overflow-hidden text-ellipsis border-b border-dark-1 px-3 py-2 text-lg text-light-7"
      >
        <span v-if="props.products">Produkte: {{ props.products.length }}</span>
        <span class="px-3 text-base text-light-9">
          {{ formatUnit(props.capacity.currentSize, props.capacity.unit ?? "") }} / {{ formatUnit(props.capacity.totalSize, props.capacity.unit ?? "") }}
        </span>
        <div class="min-w-[10rem]">
          <Progress :percent="Math.round(props.capacity.currentSize/props.capacity.totalSize * 100)" />
        </div>
      </div>
      <p
        class="overflow-hidden text-ellipsis px-3 py-2 text-base text-light-9"
      >
        {{ props.item.description ?? " " }}
      </p>
    </div>
    <div class="flex justify-around border-t border-dark-1 opacity-0 transition-all group-hover:opacity-100">
      <button
        v-if="!noEdit"
        class="w-full border-r border-dark-2 px-3 py-2 text-base text-gray-4 transition-colors hover:text-blue"
        @click="emit('edit')"
      >
        <IconWithText center>
          <template #icon>
            <EditIcon class="size-4" />
          </template>
        </IconWithText>
      </button>
      <Popconfirm
        v-if="props.deleteConfig"
        :title="props.deleteConfig.title"
        okText="Ja"
        cancelText="Nein"
        @confirm="props.deleteConfig.onDelete"
      >
        <button
          class="w-full px-2 py-2 text-base text-gray-4 transition-colors hover:text-red"
        >
          <IconWithText center>
            <template #icon>
              <DeleteIcon class="size-4" />
            </template>
          </IconWithText>
        </button>
      </Popconfirm>
      <slot name="customActions" />
    </div>
  </div>
</template>

<style scoped>
.drag-success {
  @apply bg-cyan-3/20;
}

.drag-fail {
  @apply bg-red-3/20;
}
</style>
