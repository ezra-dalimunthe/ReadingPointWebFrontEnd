import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginForm from "@/views/Account/LoginForm";
import store from "@/store";
Vue.use(VueRouter);

// const ifAuthenticated = (to, from, next) => {
//   if (store.getters.isAuthenticated) {
//     next();
//     return;
//   }
//   next("/login");
// };
const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/");
};

const routes = [
  {
    path: "/",
    component: () => import("@/views/Layouts/SecureLayout.vue"),

    children: [
      {
        path: "",
        name: "home",
        component: HomeView,
      },
    ],
  },

  {
    path: "/login",
    name: "login",
    component: LoginForm,
    beforeEnter: ifNotAuthenticated,
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/views/AboutView.vue"),
  },
];

const router = new VueRouter({
  routes,
  scrollBehavior() {
    document.getElementById("app").scrollIntoView();
  },
});

export default router;
