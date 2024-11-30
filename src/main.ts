import "@unocss/reset/normalize.css";
import "virtual:uno.css";
import "./styles/main.less";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { api } from "./lib/api/core";
import { endpoints } from "./lib/api/endpoints";

const app = createApp(App);

app.use(router);
app.mount("#app");

const result = await api.exec(endpoints.getStorages, {});
console.log(result.data?.data);
