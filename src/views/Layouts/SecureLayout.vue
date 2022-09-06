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
          <b-nav-item :to="{ name: 'borrow-book-form' }"
            >Peminjaman Buku</b-nav-item
          >
          <b-nav-item :to="{ name: 'return-book-page' }"
            >Pengembalian Buku</b-nav-item
          >
          <b-nav-item v-b-toggle.sub-master-data>Master Data</b-nav-item>
          <b-collapse id="sub-master-data" class="sub-menu">
            <b-nav-item :to="{ name: 'master-book-table' }">Buku</b-nav-item>
            <b-nav-item :to="{ name: 'master-member-table' }"
              >Keanggotaan</b-nav-item
            >
          </b-collapse>
          <li class="nav-item pl-3 pr-3">
            <div style="border-top: 1px solid white; padding-left: 0.5rem" />
          </li>
          <b-nav-item v-if="false" :to="{ name: 'profile' }"
            >Profile</b-nav-item
          >
          <b-nav-item v-if="false" href="#">Sign Out</b-nav-item>
          <b-nav-item :to="{ name: 'about' }">About</b-nav-item>
        </b-nav>
      </div>
      <transition name="scale" mode="out-in">
        <router-view id="main" class="container-fluid" />
      </transition>
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
#sidebarToggle {
  position: fixed;
  top: 59px;
  left: 253px;
  width: 54px;
  height: 40px;
  padding: 3px 0;
  border-radius: 15%;
  font-size: 8px;
  text-align: center;
  z-index: 1005;
  scroll-margin-top: 5rem;
  background-color: red;
  transition: 0.5s;
}

.nav-open #sidemenu {
  width: 250px;
}

#sidemenu {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 230px;
  transition: 0.5s;
  z-index: 1000;
}
#sidemenu ul {
  transition: 0.5s;
}
#main {
  margin-left: 230px;
  min-height: 70vh;
  transition: 0.5s;
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
@media (max-width: 768px) {
  #sidemenu {
    width: 0px;
  }
  #sidemenu ul {
    margin-left: -200px;
  }
  .nav-open #sidemenu ul {
    margin-left: unset;
  }
  #main {
    margin-left: 0px;
  }
}

@media (min-width: 768px) {
  .wrapper {
    display: flex;
  }
  .nav-open #sidemenu {
    width: 0px;
  }
  .nav-open #sidemenu ul {
    margin-left: -300px;
  }
  .nav-open #main {
    margin-left: 0px;
  }
}
</style>
