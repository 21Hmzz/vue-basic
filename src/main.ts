import "./assets/main.css";
import "./index.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-bootstrap.css";
import store from './_helpers/store';


const app = createApp(App);
app.use(store);
app.use(router);
app.use(ToastPlugin, { position: "top-right" });

app.mount("#app");
