import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";
import autoImport from "unplugin-auto-import/vite";
import UnoCSS from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "~/": `${path.resolve(__dirname, "src")}/`,
    },
  },
  plugins: [
    UnoCSS(),
    vue(),
    svgLoader(),
    autoImport({
      imports: ["vue", "vue-router", "@vueuse/core"],
      dts: true,
    }),
  ],
});
