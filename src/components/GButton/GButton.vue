<script setup lang="ts">
const props = defineProps<{
  label: string,
  disabled?: boolean
}>();

const off = computed(() => {
  return props.disabled;
});

const disabledColor = computed(() => ({
  "bg-amber-2": off.value
}));
</script>

<template>
  <button
    type="button"
    :disabled="off"
    :aria-disabled="off"
  >
    <div :class="['flex h-full whitespace-nowrap items-center justify-center bg-amber-4', disabledColor]">
      <span>{{ label }}</span>
    </div>
  </button>
</template>
