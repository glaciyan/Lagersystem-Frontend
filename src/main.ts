import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import tooltip from "./directives/tooltip";

const app = createApp(App);

app.use(router);
tooltip(app, {
  tooltipId: "tooltip",
  tooltipContentId: "tooltipContent",
  tooltipArrowId: "tooltipArrow",
  offset: 8,
  shiftPadding: 6,
  arrowPadding: 10,
});

app.mount("#app");
