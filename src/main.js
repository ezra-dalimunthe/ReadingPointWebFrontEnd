import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueShowdown from 'vue-showdown'


import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import moment from "moment";
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


Vue.use(VueShowdown, {
  flavor: 'github',
  options: {
    emoji: false,
  },
})
Object.defineProperties(Vue.prototype, {
  $moment: {
    get: function () {
      return moment;
    },
  },
});
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
