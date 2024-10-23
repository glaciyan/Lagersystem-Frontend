<script setup lang="ts">
import { ButtonLoadingPosition } from "./ButtonLoadingConfig";
import GSpinner from "../GSpinner.vue";
import { ButtonType } from "./ButtonType";
import { ButtonColorVariant, ButtonTypeDefinitions } from "./ButtonTypeDefinition";

export interface Props {
  /** The text that will be displayed on the button. */
  label: string;
  /** Set this to `true` to disabled the button. */
  disabled?: boolean;
  /** This will determine the non color visuals of the button. Variants are: `solid`. */
  variant?: ButtonType;
  /** This will determine the color of the button. Available colors are: `primary`, `danger`. */
  color?: ButtonColorVariant;
  /** This determines the Position of the loading spinner animation. `center` will hide the `label`. Options: `left`, `center`, `right`. */
  loadingPosition?: ButtonLoadingPosition;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "solid",
  color: "primary",
  loadingPosition: null,
});

const isLoading = computed(() => !!props.loadingPosition);

const isTransparent = computed(() => props.disabled || isLoading.value);

const styles: { [key in ButtonType]: ButtonTypeDefinitions } = {
  solid: {
    primary: {
      base: "bg-primary-5 hover:bg-primary-4 active:bg-primary-6 text-white",
      disabled: "bg-primary-3 text-white",
    },
    danger: {
      base: "bg-rose-5 hover:bg-rose-4 active:bg-rose-6 text-white",
      disabled: "bg-rose-3 text-white",
    },
  },
};

const buttonClasses = computed(() => [
  isTransparent.value ? styles[props.variant][props.color].disabled : styles[props.variant][props.color].base,
  "flex h-full py-1 px-4 rounded-md whitespace-nowrap items-center justify-center transition-colors",
  {
    "hover:cursor-no-drop": props.disabled,
    "hover:cursor-wait": isLoading.value,
  },
]);

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
  >
    <div :class="buttonClasses">
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
    </div>
  </button>
</template>
