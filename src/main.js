import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

import store from "@/store";
// Import Bootstrap and BootstrapVue CSS files (order is important)

import "@/assets/scss/app.scss";

Vue.mixin({
  data() {
    return {};
  },
});

Vue.use(BootstrapVue, {
  BFormGroup: {
    labelColsSm: 4,
    labelColsLg: 3,
    contentColsSm: true,
    contentColsLg: 7,
  },
  BCard: {
    headerClass: "bg-gradient-primary text-white",
  },
  BTable: {
    hover: true,
    headVariant: "gradient-info",
    headRowVariant: "text-white",
    primaryKey: "id",
    noBorderCollapse: true,
    emptyText: "",
    emptyFilteredText: "Tidak ada data.",
    showEmpty: true,
  },
});

Vue.use(IconsPlugin);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
