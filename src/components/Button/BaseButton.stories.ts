import type { Meta, StoryObj } from "@storybook/vue3";

import GButton from "./GButton.vue";

const meta = {
  title: "General/GButton",
  component: GButton,
  tags: ["autodocs"],
  args: {
    label: "Button",
  },
} satisfies Meta<typeof GButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
  },
};

export const Filled: Story = {
  args: {
    variant: "filled",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
  },
};

export const OutlinedGost: Story = {
  args: {
    variant: "outlined-ghost",
  },
};

export const Link: Story = {
  args: {
    variant: "link",
  },
};

/** #### Warning
 * It is generally bad practice to have to disable a button. */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const LoadingLeft: Story = {
  args: {
    loadingPosition: "left",
  },
};

export const OverrideDefaultTheme: Story = {
  args: {
    class: "w-20 h-20",
    size: "none",
  },
};
