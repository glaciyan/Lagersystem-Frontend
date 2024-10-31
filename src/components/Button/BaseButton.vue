<script setup lang="ts">
import { ButtonLoadingPosition } from "./ButtonLoadingPosition";
import GSpinner from "~/components/GSpinner/GSpinner.vue";

export interface Props {
  /** The text that will be displayed on the button. */
  label: string;
  /** Set this to `true` to disabled the button. */
  disabled?: boolean;
  /** This determines the Position of the loading spinner animation. `center` will hide the `label`. Options: `left`, `center`, `right`. */
  loadingPosition?: ButtonLoadingPosition;
}

const props = withDefaults(defineProps<Props>(), {
  loadingPosition: null,
});

const isLoading = computed(() => !!props.loadingPosition);

const isTransparent = computed(() => props.disabled || isLoading.value);
</script>

<template>
  <button
    type="button"
    :disabled="isTransparent"
    :aria-disabled="isTransparent"
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
