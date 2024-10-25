import { defineConfig, presetAttributify, presetUno } from "unocss";
import transformerDirectives from "@unocss/transformer-directives";
import { colors } from "./src/uno/colors";

export default defineConfig({
  presets: [presetUno(), presetAttributify()],
  transformers: [transformerDirectives()],
  content: {
    pipeline: {
      include: [
        // the default
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        // include js/ts files
        "src/**/*.{js,ts}",
      ],
    },
  },
  rules: [
    [/^btn-(.*)$/, ([, themeName], { theme }) => {
      return {
        "--btn-normal-color": "soemthing",
      };
    }],
  ],
  shortcuts: [
    {
      "btn-solid":
      `bg-[color:--btn-normal-color]
      text-[color:--btn-text-normal-color]
      active:bg-[color:--btn-pressed-color]
      disabled:bg-[color:--btn-disabled-color]
      hover:bg-[color:--btn-hover-color]
      hover:text-[color:--btn-text-hover-color]`,
    },
  ],
  theme: {
    colors,
  },
  extendTheme: (theme: any) => {
    return {
      ...theme,
      breakpoints: {
        ...theme.breakpoints,
        "xlp": "1320px",
        "2xlp": "1570px",
      },
      fontSize: {
        "sm": [12, 20],
        "base": [14, 22],
        "lg": [16, 24],
        "xl": [20, 28],
        "2xl": [24, 32],
      },
    };
  },
});
