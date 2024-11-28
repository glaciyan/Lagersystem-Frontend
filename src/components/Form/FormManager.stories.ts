import { Meta, StoryFn } from "@storybook/vue3";
import FormExample from "~/components/Form/FormExample.vue";

export default {
  title: "Components/Form/FormExample",
  component: FormExample,
  parameters: {
    layout: "centered",
  },
} as Meta;

const Template: StoryFn = args => ({
  components: { FormExample },
  setup() {
    return { args };
  },
  template: `<FormExample v-bind="args" />`,
});

// Default story
export const Default = Template.bind({});
Default.args = {};
