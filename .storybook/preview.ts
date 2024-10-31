import "@unocss/reset/tailwind.css";
import "virtual:uno.css";
import "../src/styles/theme.less";
import type { Preview } from "@storybook/vue3";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
