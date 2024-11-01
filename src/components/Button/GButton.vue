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
  variant?: "solid";
  theme?: "primary";
  size?: "md";
  rounding?: "full";
}

const props = withDefaults(defineProps<Props>(), {
  loadingPosition: null,
  variant: "solid",
  theme: "primary",
  size: "md",
  rounding: "full",
});

const theme = computed(() => ([
  `btn-round-${props.rounding}`,
  {
    "btn-solid": props.variant === "solid",
    "btn-primary": props.theme === "primary",
    "btn-md": props.size === "md",
  },
]));
</script>

<template>
  <BaseButton
    :class="['btn', theme, $props.class]"
    :label="label"
    :disabled="disabled"
    :loadingPosition="loadingPosition"
  />
</template>

<style scoped lang="less">
@import "~/styles/theme.less";

// Themes
@import "./themes/primary.less";

// Variants
@import "./variants/solid.less";

// Defaults
.btn {
  @apply flex whitespace-nowrap items-center justify-center transition-colors;

  --ls-cmp-button-rounding-size: 0.375rem;

  &:disabled {
    @apply cursor-no-drop;

    &[data-loading='true'] {
      @apply cursor-wait;
    }
  }

  &-md {
    @apply py-1 px-4 h-full;
  }

  &-round {
    &-full {
      border-radius: var(--ls-cmp-button-rounding-size);
    }

    &-right {
      border-top-right-radius: var(--ls-cmp-button-rounding-size);
      border-bottom-right-radius: $border-top-right-radius;
    }

    &-bottom {
    border-bottom-right-radius: var(--ls-cmp-button-rounding-size);
    border-bottom-left-radius: $border-bottom-right-radius;
    }

    &-left {
      border-top-left-radius: var(--ls-cmp-button-rounding-size);
      border-bottom-left-radius: $border-top-left-radius;
    }

    &-top {
      border-top-right-radius: var(--ls-cmp-button-rounding-size);
      border-top-left-radius: $border-top-right-radius;
    }
  }
}
</style>
