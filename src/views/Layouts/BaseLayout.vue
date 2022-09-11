<template>
  <div class="bg-light">
    <NavBar />
    <div class="wrapper">
      <transition name="scale" mode="out-in">
        <router-view id="mainbase" class="container-fluid" />
      </transition>
    </div>

    <footer class="mt-4 mb-2">
      <div class="container text-center">
        <p class="text-muted mb-0 py-2">
          © 2022 Reading pOint All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>
<script>
import NavBar from "@/components/NavBar.vue";
export default {
  name: "BaseLayout",
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
