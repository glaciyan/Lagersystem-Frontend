<script setup lang="ts">
import { ButtonLoadingPosition } from "./ButtonLoadingPosition";
import GSpinner from "~/components/GSpinner/GSpinner.vue";

export interface Props {
  label: string;
  disabled?: boolean;
  loadingPosition?: ButtonLoadingPosition;
}

const props = withDefaults(defineProps<Props>(), {
  loadingPosition: null,
});

const isLoading = computed(() => !!props.loadingPosition);

const isDisabled = computed(() => props.disabled || isLoading.value);
</script>

<template>
  <button
    type="button"
    :disabled="isDisabled"
    :aria-disabled="isDisabled"
    :data-loading="isLoading"
  >
    <GSpinner
      v-if="props.loadingPosition === 'left' || props.loadingPosition === 'center'"
      class="mr-1.5"
    />
    <span :class="{ 'invisible': isLoading && props.loadingPosition === 'center' }">
      {{ label }}
    </span>
    <GSpinner
      v-if="props.loadingPosition === 'right'"
      class="ml-1.5"
    />
  </button>
</template>
