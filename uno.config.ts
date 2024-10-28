import { defineConfig, presetAttributify, presetUno } from "unocss";
import transformerDirectives from "@unocss/transformer-directives";
import transformerVariantGroup from "@unocss/transformer-variant-group";
import { range } from "./src/lib/range";

export default defineConfig({
  presets: [presetUno(), presetAttributify()],
  // @ts-ignore
  transformers: [transformerDirectives(), transformerVariantGroup()],
  content: {
    pipeline: {
      include: [
        // the default
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        "src/**/*.stories.ts",
      ],
    },
  },
  variants: [
    (matcher) => {
      if (matcher.startsWith("loading:")) {
        return {
          matcher: matcher.slice(8), // Remove "loading:" prefix
          selector: s => `${s}[data-loading="true"]`,
          sort: 1001,
        };
      }
    },
  ],
  safelist: [
    ...range(5).map(r => `text-genshin-rarity-${r}`),
  ],
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
