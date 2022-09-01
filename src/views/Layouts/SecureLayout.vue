<template>
  <div class="bg-light">
    <NavBar />
    <div class="wrapper">
      <div id="sidemenu" class="bg-gradient-primary shadow">
        <b-nav vertical>
          <b-nav-item :to="{ name: 'home' }">
            <b-icon-speedometer />
            Dashboard</b-nav-item
          >
          <b-nav-item :to="{ name: 'book-borrow-page' }"
            >Peminjaman Buku</b-nav-item
          >
          <b-nav-item :to="{ name: 'book-return-page' }"
            >Pengembalian Buku</b-nav-item
          >
          <b-nav-item v-b-toggle.sub-master-data>Master Data</b-nav-item>
          <b-collapse id="sub-master-data" class="sub-menu">
            <b-nav-item :to="{ name: 'master-book' }">Buku</b-nav-item>
            <b-nav-item :to="{ name: 'master-member' }">Keanggotaan</b-nav-item>
          </b-collapse>
        </b-nav>
      </div>
      <router-view id="main" class="container" />
    </div>

    <footer class="mt-4 mb-2">
      <div class="container text-center">
        <p class="text-muted mb-0 py-2">© 2022 Unpri All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>
<script>
import NavBar from "@/components/NavBar.vue";
export default {
  name: "SecureLayout",
  components: { NavBar },
  methods: {
    loggedOut() {
      this.$forceUpdate();
    },
  },
};
</script>
<style>

#sidemenu {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 230px;
}
#sidemenu .nav {
  margin-top: 100px;
}
#sidemenu a {
  color: var(--white);
}
#sidemenu a:hover {
  color: var(--yellow);
}
#sidemenu .active {
  color: var(--yellow);
}
.sub-menu {
  padding-left: 30px;
}
#main {
  margin-left: 230px;
}
</style>
