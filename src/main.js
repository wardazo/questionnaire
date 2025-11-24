import "./scss/main.scss";
import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";

import i18n from "./i18n";
import FloatingVue from "floating-vue";
import "floating-vue/dist/style.css";

import Vuelidate from '@vuelidate/core'  // Notice: no curly braces


const pinia = createPinia();

createApp(App).use(pinia).use(FloatingVue).use(i18n).use(Vuelidate).mount("#app");
