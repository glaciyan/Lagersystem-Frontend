import "@unocss/reset/normalize.css";
import "virtual:uno.css";
import "./styles/main.less";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { api } from "./lib/api/api";
import { endpoints } from "./lib/api/endpoints";
import { match } from "./lib/api/match";

const app = createApp(App);

app.use(router);
app.mount("#app");

const req = await api(endpoints.getStorages, {});

match(req, {
  ok: (data) => { console.log(data); },
  error: (err) => { console.error(err); },
});
