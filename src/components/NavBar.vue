<template>
  <b-navbar toggleable="lg" type="dark" variant="gradient-primary" fixed="top" class="mb-4">
    <b-navbar-brand style="width:230px;" :to="{ name: 'home' }">Reading Point</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
       
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto" >
       <b-nav-item :to="{ name: 'about' }">About</b-nav-item>
        <b-nav-item-dropdown right v-if="false">
          <template #button-content>
            <em>{{ loggedInUserFullname }}</em>
          </template>
          <b-dropdown-item  :to="{ name: 'profile' }">Profile</b-dropdown-item>
          <b-dropdown-item @click="logOut" href="#">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
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
  },
  computed: {
    loggedInUserFullname() {
      var user = this.$store.getters.user;
      return user.name;
    },
  },
};
</script>
