import type { Meta, StoryObj } from "@storybook/vue3";

import GButton from "./GButton.vue";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: "Utility/GButton",
  component: GButton,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  args: {
    label: "Button",
  },
} satisfies Meta<typeof GButton>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  args: {
  },
};

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

export const LoadingCenter: Story = {
  args: {
    loadingPosition: "center",
  },
};

export const LoadingRight: Story = {
  args: {
    loadingPosition: "right",
  },
};

export const DefaultOutlined: Story = {
  args: {
    variant: "btn-outlined",
  },
};

export const OutlinedDisabledLoading: Story = {
  args: {
    label: "Button",
    variant: "btn-outlined",
    disabled: true,
    loadingPosition: "left",
  },
};

export const OutlinedDisabled: Story = {
  args: {
    label: "Button",
    variant: "btn-outlined",
    disabled: true,
  },
};

export const PrimaryOutlined: Story = {
  args: {
    label: "Button",
    variant: "btn-outlined",
    color: "btn-primary",
  },
};

export const Danger: Story = {
  args: {
    variant: "btn-solid",
    color: "btn-danger",
  },
};

export const DangerOutlined: Story = {
  args: {
    label: "Button",
    variant: "btn-outlined",
    color: "btn-danger",
  },
};
