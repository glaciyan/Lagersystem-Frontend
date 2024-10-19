import { defineConfig, presetAttributify, presetUno, presetWind } from "unocss";
import transformerDirectives from '@unocss/transformer-directives'

const elements = ["pyro", "cryo", "geo", "anemo", "electro", "dendro"];

export default defineConfig({
  presets: [presetUno(), presetAttributify(), presetWind()],
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
  safelist: [
    ...elements.map(element => `ring-genshin-element-${element}`),
  ],
  extendTheme: (theme: any) => {
    return {
      ...theme,
      breakpoints: {
        ...theme.breakpoints,
        xlp: "1320px",
        "2xlp": "1570px",
      },
      colors: {
        ...theme.colors,
        dark: {
          "50": "#aaacb0",
          "100": "#87898f",
          "200": "#404040",
          "300": "#373739",
          "400": "#2f3033",
          "500": "#292A2C",
          "600": "#252527",
          "700": "#1d1e20",
          "800": "#18191b",
          "900": "#09090a",
        },
        light: {
          important: "#F4F4F4",
          normal: "#C9CBCF",
          ternary: "#8A8C8F",
        },
        genshin: {
          element: {
            anemo: "#80FFD7",
            pyro: "#FF9999",
            electro: "#FFACFF",
            geo: "#FFE667",
            cryo: "#99FFFF",
            hydro: "#80C0FF",
            dendro: "#B6F263",
            neutral: "#F4F4F4",
            danger: "#EF4444",
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
