import type { Meta, StoryObj } from "@storybook/vue3";

import RarityStars from "./RarityStars.vue";

const meta = {
  title: "Display/Stars",
  component: RarityStars,
  tags: ["autodocs"],
} satisfies Meta<typeof RarityStars>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FiveStars: Story = {
  args: {
    rarity: 5,
  },
};

export const FourStars: Story = {
  args: {
    rarity: 4,
  },
};

export const ThreeStars: Story = {
  args: {
    rarity: 3,
  },
};

export const TwoStars: Story = {
  args: {
    rarity: 2,
  },
};

export const OneStar: Story = {
  args: {
    rarity: 1,
  },
};
