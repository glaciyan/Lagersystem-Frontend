import type { Meta, StoryObj } from "@storybook/vue3";

import RarityStars from "./RarityStars.vue";

const meta = {
  title: "Data/Stars",
  component: RarityStars,
  tags: ["autodoc"],
} satisfies Meta<typeof RarityStars>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FiveStars: Story = {
  args: {
    rarity: 5,
  },
};
