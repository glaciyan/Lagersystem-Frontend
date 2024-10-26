<script setup lang="ts">
import { ButtonLoadingPosition } from "./ButtonLoadingPosition";
import GSpinner from "~/components/GSpinner.vue";

export interface Props {
  /** The text that will be displayed on the button. */
  label: string;
  /** Set this to `true` to disabled the button. */
  disabled?: boolean;
  /** This determines the Position of the loading spinner animation. `center` will hide the `label`. Options: `left`, `center`, `right`. */
  loadingPosition?: ButtonLoadingPosition;
  /** This will determine the non color visuals of the button. Variants are: `btn-solid`, `btn-outlined`. */
  variant?: string;
  /** This will determine the color of the button. */
  color?: string;
}

const props = withDefaults(defineProps<Props>(), {
  loadingPosition: null,
  variant: "btn-solid",
  color: "btn-default",
});

const isLoading = computed(() => !!props.loadingPosition);

const isTransparent = computed(() => props.disabled || isLoading.value);

const spinnerClasses = computed(() => ({
  "mr-1.5": props.loadingPosition === "left",
  "ml-1.5": props.loadingPosition === "right",
}));
</script>

<template>
  <button
    type="button"
    :disabled="isTransparent"
    :aria-disabled="isTransparent"
    :data-loading="isLoading"
    :class="[variant, color, 'disabled:loading:cursor-wait disabled:cursor-no-drop flex h-full py-1 px-4 rounded-md whitespace-nowrap items-center justify-center transition-colors']"
  >
    <GSpinner
      v-if="props.loadingPosition === 'left' || props.loadingPosition === 'center'"
      :class="[spinnerClasses, {'inline-block absolute': props.loadingPosition === 'center' }]"
    />
    <span :class="{ 'opacity-0': isLoading && props.loadingPosition === 'center' }">
      {{ label }}
    </span>
    <GSpinner
      v-if="props.loadingPosition === 'right'"
      :class="[spinnerClasses]"
    />
  </button>
</template>
