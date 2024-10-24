import { defineConfig, presetAttributify, presetUno } from "unocss";
import transformerDirectives from "@unocss/transformer-directives";
import transformerVariantGroup from "@unocss/transformer-variant-group";

export default defineConfig({
  presets: [presetUno(), presetAttributify()],
  transformers: [transformerDirectives(), transformerVariantGroup()],
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
      colors: {
        ...theme.colors,
        gray: {
          1: "#ffffff",
          2: "#fafafa",
          3: "#f5f5f5",
          4: "#f0f0f0",
          5: "#d9d9d9",
          6: "#bfbfbf",
          7: "#8c8c8c",
          8: "#595959",
          9: "#434343",
          10: "#262626",
          11: "#1f1f1f",
          12: "#141414",
          13: "#000000",
        },
        primary: {
          1: "#e6fffb", // cyan-1
          2: "#b5f5ec", // cyan-2
          3: "#87e8de", // cyan-3
          4: "#5cdbd3", // cyan-4
          5: "#36cfc9", // cyan-5
          6: "#13c2c2", // cyan-6
          7: "#08979c", // cyan-7
          8: "#006d75", // cyan-8
          9: "#00474f", // cyan-9
          10: "#002329", // cyan-10
        },
        light: {
          "important": "#F4F4F4",
          "normal": "#C9CBCF",
          "ternary": "#8A8C8F",
          "on-primary": "#C9CBCF",
        },
        genshin: {
          element: {
            "anemo": "#80FFD7",
            "pyro": "#FF9999",
            "electro": "#FFACFF",
            "geo": "#FFE667",
            "cryo": "#99FFFF",
            "hydro": "#80C0FF",
            "dendro": "#B6F263",
            "neutral": "#F4F4F4",
            "danger": "#EF4444",
            "anemo-dark": "#2FD09A",
            "pyro-dark": "#FF5C5C",
            "electro-dark": "#E368E3",
            "geo-dark": "#edad54",
            "cryo-dark": "#57cbcb",
            "hydro-dark": "#3D9EFF",
            "dendro-dark": "#7bb42d",
            "neutral-dark": "#8D8D8D",
          },
          rarity: {
            1: "#757575",
            2: "#6FD1A2",
            3: "#5AA6E0",
            4: "#B07DE6",
            5: "#F08E3A",
          },
        },
      },
    };
  },
});
