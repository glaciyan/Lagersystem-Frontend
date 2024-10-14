import type { Meta, StoryObj } from '@storybook/vue3';

import GButton from './GButton.vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Utility/GButton',
  component: GButton,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  args: {
    label: "Hello"
  }
} satisfies Meta<typeof GButton>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {};

export const Loading: Story = {
  args: {
    label: "Hello",
    isLoading: true
  }
};

export const Disabled: Story = {
  args: {
    label: "Hello",
    disabled: true
  }
};
