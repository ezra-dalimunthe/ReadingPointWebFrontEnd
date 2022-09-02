import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "@/views/HomePage.vue";
import BorrowBookPage from "@/views/BorrowBookPage";
import ReturnBookPage from "@/views/ReturnBookPage";
import MasterBookPage from "@/views/MasterBookPage.vue";
import BookTable from "@/views/MasterBook/BookTable.vue";
import BookForm from "@/views/MasterBook/BookForm.vue";
import MasterMemberPage from "@/views/MasterMemberPage.vue";
import MemberForm from "@/views/MasterMember/MemberForm.vue";
import MemberTable from "@/views/MasterMember/MemberTable.vue";
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
        component: HomePage,
      },
      {
        path: "book/borrow",
        name: "borrow-book-page",
        component: BorrowBookPage,
      },
      {
        path: "book/return",
        name: "return-book-page",
        component: ReturnBookPage,
      },
      {
        path: "/master/book",
        name: "master-book-page",
        component: MasterBookPage,
        children: [
          {
            path: "",
            name: "master-book-table",
            component: BookTable,
          },
          {
            path: "form",
            name: "master-book-form",
            component: BookForm,
          },
        ],
      },
      {
        path: "/master/member",
        name: "master-member-page",
        component: MasterMemberPage,
        children: [
          {
            path: "",
            name: "master-member-table",
            component: MemberTable,
          },
          {
            path: "new",
            name: "master-member-new",
            component: MemberForm,
          },
          {
            path: "edit/:id",
            name: "master-member-edit",
            component: MemberForm,
          },
        ],
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
  {
    path: "*",
    name: "page-error-404",
    component: () => import("@/views/Errors/PageError404.vue"),
  },
];

const router = new VueRouter({
  routes,
  scrollBehavior() {
    document.getElementById("app").scrollIntoView();
  },
});

export default router;
