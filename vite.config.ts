import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import SVGLoader from "vite-svg-loader";
import AutoImport from "unplugin-auto-import/vite";
import UnoCSS from "unocss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "~/": `${path.resolve(__dirname, "src")}/`,
    },
  },
  plugins: [
    vue(),
    UnoCSS(),
    SVGLoader(),
    AutoImport({
      imports: ["vue", "vue-router", "@vueuse/core"],
      dts: true,
    }),
  ],
});
