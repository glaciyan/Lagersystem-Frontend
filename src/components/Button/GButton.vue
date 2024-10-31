<script setup lang="ts">
import BaseButton from "./BaseButton.vue";
import { ButtonLoadingPosition } from "./ButtonLoadingPosition";

export interface Props {
  /** The text that will be displayed on the button. */
  label: string;
  /** Set this to `true` to disabled the button. */
  disabled?: boolean;
  /** This determines the Position of the loading spinner animation. `center` will hide the `label`. Options: `left`, `center`, `right`. */
  loadingPosition?: ButtonLoadingPosition;
}

withDefaults(defineProps<Props>(), {
  loadingPosition: null,
});
</script>

<template>
  <BaseButton
    class="btn btn-primary"
    :label="label"
    :disabled="disabled"
    :loadingPosition="loadingPosition"
  />
</template>

<style scoped lang="less">
@import "~/styles/theme.less";
@import "./primary.less";

.btn {
  @apply disabled:loading:cursor-wait disabled:cursor-no-drop flex h-full py-1 px-4 rounded-md whitespace-nowrap items-center justify-center transition-colors;

  &:disabled {
    @apply cursor-no-drop;

    &[data-disabled='true'] {
      @apply cursor-wait;
    }
  }
}
</style>
