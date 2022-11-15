import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "@/views/HomePage.vue";
import BorrowBookForm from "@/views/BorrowBook/BorrowBookForm";
import BorrowBookPage from "@/views/BorrowBookPage";
import ReturnBookPage from "@/views/ReturnBookPage";
import ReturnBookForm from "@/views/ReturnBook/ReturnBookForm";
import MasterBookPage from "@/views/MasterBookPage.vue";
import BookTable from "@/views/MasterBook/BookTable.vue";
import BookForm from "@/views/MasterBook/BookForm.vue";
import BookDetail from "@/views/MasterBook/BookDetail.vue";
import MasterMemberPage from "@/views/MasterMemberPage.vue";
import MemberForm from "@/views/MasterMember/MemberForm.vue";
import MemberTable from "@/views/MasterMember/MemberTable.vue";
import MemberDetail from "@/views/MasterMember/MemberDetail.vue";
import LoginForm from "@/views/Account/LoginForm";

import store from "@/store";
Vue.use(VueRouter);

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/login");
};
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
    beforeEnter: ifAuthenticated,
    children: [
      {
        path: "",
        name: "home",
        component: HomePage,
      },
      {
        path: "book/borrow",
        component: BorrowBookPage,

        children: [
          {
            path: "",
            name: "borrow-book-form",
            component: BorrowBookForm,
            meta: { roles: ["front_desk"] },
          },
        ],
      },
      {
        path: "book/return",
        component: ReturnBookPage,
        children: [
          {
            path: "",
            name: "return-book-form",
            component: ReturnBookForm,
            meta: { roles: ["front_desk"] },
          },
        ],
      },
      {
        path: "/master/book",
        component: MasterBookPage,
        children: [
          {
            path: "",
            name: "master-book-table",
            component: BookTable,
            meta: { roles: ["book_manager"] },
          },
          {
            path: "new",
            name: "master-book-new",
            component: BookForm,
            meta: { roles: ["book_manager"] },
          },
          {
            path: "edit/:id",
            name: "master-book-edit",
            component: BookForm,
            meta: { roles: ["book_manager"] },
          },
          {
            path: "view/:id",
            name: "master-book-view",
            component: BookDetail,
            meta: { roles: ["book_manager"] },
          },
        ],
      },
      {
        path: "/master/member",
        component: MasterMemberPage,
        children: [
          {
            path: "",
            name: "master-member-table",
            component: MemberTable,
            meta: { roles: ["member_manager"] },
          },
          {
            path: "new",
            name: "master-member-new",
            component: MemberForm,
            meta: { roles: ["member_manager"] },
          },
          {
            path: "edit/:id",
            name: "master-member-edit",
            component: MemberForm,
            meta: { roles: ["member_manager"] },
          },
          {
            path: "view/:id",
            name: "master-member-view",
            component: MemberDetail,
            meta: { roles: ["member_manager"] },
          },
        ],
      },
      {
        path: "/about",
        name: "about",
        component: () => import("@/views/AboutPage.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/views/Layouts/BaseLayout.vue"),
    children: [
      {
        path: "/login",
        name: "login",
        component: LoginForm,
        beforeEnter: ifNotAuthenticated,
      },
      {
        path: "forbidden",
        name: "forbidden",
        component: () => import("@/views/Errors/PageError403.vue"),
      },
      {
        path: "*",
        name: "page-error-404",
        component: () => import("@/views/Errors/PageError404.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
  scrollBehavior() {
    document.getElementById("app").scrollIntoView();
  },
});
router.beforeEach((to, from, next) => {
  if (to.meta.roles) {
    const roleExists = to.meta.roles.some((value) => {
      if (!store.getters.user.roles) {
        return false;
      }
      return store.getters.user.roles.some((item) => {
        return item.role == value;
      });
    });

    if (roleExists == false) {
      next("/forbidden");
      return;
    }
  }
  return next();
});

export default router;
