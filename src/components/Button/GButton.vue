<script setup lang="ts">
import BaseButton from "./BaseButton.vue";
import { ButtonLoadingPosition } from "./ButtonLoadingPosition";

export interface Props {
  /** The text that will be displayed on the button. */
  label: string;
  /** Set this to `true` to disabled the button. */
  disabled?: boolean;
  /** This determines the Position of the loading spinner animation. `center` will hide the `label`. Options: `left`, `center`, `right`, `null`. */
  loadingPosition?: ButtonLoadingPosition;
  /** The non-color styling of this button: Variants are: `solid` */
  variant?: "solid";
  /** Sets the main color of this button. Colors are: `primary` */
  theme?: "primary";
  /** Sizing of the button. Sizes are: `md` */
  size?: "md";
  /** Determines where the button should be rounded. Useful for button groups. Options: `full`, `top`, `bottom`, `left`, `right`, `none`. */
  rounded?: "full";
  /** Determins how large the rounding should be. Options: `default` */
  roundedRadius?: "default";
}

const props = withDefaults(defineProps<Props>(), {
  loadingPosition: null,
  variant: "solid",
  theme: "primary",
  size: "md",
  rounded: "full",
  roundedRadius: "default",
});

const classes = computed(() => ({
  btn: true,
  [`btn--variant-${props.variant}`]: props.variant,
  [`btn--theme-${props.theme}`]: props.theme,
  [`btn--size-${props.size}`]: props.size,
  [`btn--rounded-${props.rounded}`]: props.rounded,
  [`btn--rounded-radius-${props.roundedRadius}`]: props.roundedRadius,
}));
</script>

<template>
  <BaseButton
    :class="[classes, $attrs.class]"
    :label="label"
    :disabled="disabled"
    :loadingPosition="loadingPosition"
    v-bind="$attrs"
  />
</template>

<style scoped lang="less">
@import "~/styles/main.less";

// Defaults
.btn {
  // Button Rounding
  @import "./rounded.less";

  // Themes
  &--theme {
    @import "./themes/primary.less";
  }

  // Variants
  &--variant {
    @import "./variants/solid.less";
    @import "./variants/outlined.less";
  }

  // Default styles
  @apply flex whitespace-nowrap items-center justify-center transition-colors;

  // State based cursor
  &:disabled {
    @apply cursor-no-drop;

    &[data-loading='true'] {
      @apply cursor-wait;
    }
  }

  // Sizes
  &--size {
    &-md {
      padding-top: 0.07rem;
      padding-bottom: $padding-top;
      padding-left: 1rem;
      padding-right: $padding-left;
    }
  }
}
</style>
