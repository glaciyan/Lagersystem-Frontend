import type { Meta, StoryObj } from "@storybook/vue3";
import GButton from "./GButton.vue";

const meta: Meta<typeof GButton> = {
  title: "General/GButton",
  component: GButton,
  args: {
    theme: "default", // Default theme
    label: "Button",
  },
};

export default meta;
type Story = StoryObj<typeof GButton>;

// Define template for all variants
export const Default: Story = {
  render: args => ({
    components: { GButton },
    setup() {
      const variants = ["solid", "outlined", "filled", "ghost", "outlined-ghost", "link"];
      const states = [
        { label: "Default", props: {} },
        { label: "Disabled", props: { disabled: true } },
        { label: "Loading (Left)", props: { loadingPosition: "left" } },
        { label: "Loading (Right)", props: { loadingPosition: "right" } },
        { label: "Loading", props: { loadingPosition: "center" } },
      ];

      return { args, variants, states };
    },
    template: `
      <div class="p-6 bg-gray-50">
        <h3 class="text-lg font-semibold text-gray-700">Theme: {{ args.theme }}</h3>
        <div class="overflow-x-auto mt-4 rounded-lg border border-gray-200 shadow-sm">
          <table class="w-full text-base text-left text-gray-600">
            <thead class="bg-gray-100 border-b border-gray-200">
              <tr>
                <th v-for="variant in variants" :key="variant" class="py-3 px-4 font-semibold text-gray-700 text-center">
                  {{ variant }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="state in states" :key="state.label" class="odd:bg-white even:bg-gray-50">
                <td v-for="variant in variants" :key="variant" class="py-3 px-4 text-center border-b border-gray-200">
                  <GButton
                    :theme="args.theme"
                    :variant="variant"
                    :label="state.label"
                    :disabled="state.props.disabled"
                    :loading-position="state.props.loadingPosition"
                  >
                    {{ state.label }}
                  </GButton>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div> 
    `,
  }),
};

export const Primary: Story = {
  ...Default,
  args: {
    theme: "primary", // Can be controlled in Storybook to change theme
  },
};
