import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./index.css";
import store from "./store";
import VueConfetti from "vue-confetti";

createApp(App).use(router).use(store).use(VueConfetti).mount("#app");
