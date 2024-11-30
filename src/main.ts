import "@unocss/reset/normalize.css";
import "virtual:uno.css";
import "./styles/main.less";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { endpoints } from "./lib/api/endpoints";
import { api } from "./lib/api/api";
import { match } from "./lib/api/match";

const app = createApp(App);

app.use(router);
app.mount("#app");

const result = await api(endpoints.getStorages, {});
match(result, {
  ok: (data) => {
    console.log(data);
  },
  error: (err) => {
    console.log(err);
  },
});
