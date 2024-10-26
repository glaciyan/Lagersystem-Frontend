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
  /** Style classes. */
  btnStyle?: string;
}

const props = withDefaults(defineProps<Props>(), {
  loadingPosition: null,
  btnStyle: "btn-solid btn-default",
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
    :class="[btnStyle, 'disabled:loading:cursor-wait disabled:cursor-no-drop flex h-full py-1 px-4 rounded-md whitespace-nowrap items-center justify-center transition-colors']"
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
