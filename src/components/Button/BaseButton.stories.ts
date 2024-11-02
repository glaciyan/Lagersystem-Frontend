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

export const Solid: Story = {
  args: {
  },
};

export const Default: Story = {
  args: {
    variant: "outlined",
  },
};

export const OverrideDefaultTheme: Story = {
  args: {
    class: "w-20 h-20",
    size: "none",
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

// export const LoadingCenter: Story = {
//   args: {
//     loadingPosition: "center",
//   },
// };

// export const LoadingRight: Story = {
//   args: {
//     loadingPosition: "right",
//   },
// };

// export const DefaultOutlined: Story = {
//   args: {
//     variant: "btn-outlined",
//   },
// };

// export const OutlinedDisabledLoading: Story = {
//   args: {
//     label: "Button",
//     variant: "btn-outlined",
//     disabled: true,
//     loadingPosition: "left",
//   },
// };

// export const OutlinedDisabled: Story = {
//   args: {
//     label: "Button",
//     variant: "btn-outlined",
//     disabled: true,
//   },
// };

// export const PrimaryOutlined: Story = {
//   args: {
//     label: "Button",
//     variant: "btn-outlined",
//     color: "btn-primary",
//   },
// };

// export const Danger: Story = {
//   args: {
//     variant: "btn-solid",
//     color: "btn-danger",
//   },
// };

// export const DangerOutlined: Story = {
//   args: {
//     label: "Button",
//     variant: "btn-outlined",
//     color: "btn-danger",
//   },
// };
