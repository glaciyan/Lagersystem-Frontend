import "@unocss/reset/normalize.css";
import "virtual:uno.css";
import "./styles/main.less";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(router);
app.mount("#app");
