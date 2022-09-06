<template>
  <b-navbar
    toggleable="lg"
    type="dark"
    variant="gradient-primary"
    fixed="top"
    class="mb-4"
  >
    <b-navbar-brand :to="{ name: 'home' }">
    <b-img src="/images/logo.png" style="max-height:24px"></b-img>
    Reading Point</b-navbar-brand>
    <button
      type="button"
      aria-label="Toggle navigation"
      class="sidebar-toggler"
      aria-expanded="false"
      aria-controls="nav-collapse"
      style="overflow-anchor: none"
      @click="toggleSidebar"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
  </b-navbar>
</template>
<script>
import { authService } from "@/services/authService";

export default {
  data() {
    return {
      userProfile: JSON.parse(localStorage.getItem("userData")),
    };
  },
  methods: {
    logOut() {
      var action = new authService(this.$dataService);
      action.logout().finally(() => {
        this.$store
          .dispatch("ACTION_LOGOUT")
          .then(this.$router.push({ name: "login" }));
      });
    },
    toggleSidebar() {
      var w = document.querySelector(".wrapper");
      w.classList.toggle("nav-open");
    },
  },
  computed: {
    loggedInUserFullname() {
      var user = this.$store.getters.user;
      return user.name;
    },
  },
};
</script>
<style>
.sidebar-toggler {
  padding: 0.25rem 0.75rem;
  font-size: 1.25rem;
  line-height: 1;
  background-color: transparent;
  border: 1px solid transparent;
  border-radius: 0.25rem;
}
</style>
