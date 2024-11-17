import "@unocss/reset/normalize.css";
import "virtual:uno.css";
import "./styles/main.less";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import Antd from "ant-design-vue";
// import "ant-design-vue/dist/antd.css";
import router from "./router";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(Antd);
app.use(router);
app.mount("#app");
