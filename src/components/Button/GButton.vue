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
  variant?: string;
  theme?: string;
  size?: string;
}

const props = withDefaults(defineProps<Props>(), {
  loadingPosition: null,
  variant: "solid",
  theme: "primary",
  size: "md",
});

const theme = computed(() => {
  return {
    "btn-solid": props.variant === "solid",
    "btn-primary": props.theme === "primary",
    "btn-md": props.size === "md",
  };
});
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
  @apply disabled:loading:cursor-wait disabled:cursor-no-drop flex rounded-md whitespace-nowrap items-center justify-center transition-colors;

  &:disabled {
    @apply cursor-no-drop;

    &[data-disabled='true'] {
      @apply cursor-wait;
    }
  }

  &-md {
    @apply py-1 px-4 h-full;
  }
}
</style>
