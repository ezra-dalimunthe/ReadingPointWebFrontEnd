import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

import store from "@/store";
// Import Bootstrap and BootstrapVue CSS files (order is important)

import "@/assets/scss/app.scss";

Vue.mixin({
  data() {
    return {
      API_URL: process.env.VUE_APP_PUBLIC_API_URL,
      isLoggedIn: false,
      breadcrumbItems: [{ text: "Home", to: { name: "home" } }],
    };
  },
});

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
