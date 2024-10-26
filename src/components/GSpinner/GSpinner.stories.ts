import type { Meta, StoryObj } from "@storybook/vue3";

import GSpinner from "./GSpinner.vue";

const meta = {
  title: "Feedback/Spinner",
  component: GSpinner,
  tags: ["autodocs"],
} satisfies Meta<typeof GSpinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
  },
};
