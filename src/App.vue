<template>
  <router-view id="app" style="padding-top: 80px" />
</template>

<style>
.modal.show .modal-dialog {
  transform: translate(0, 0) !important;
}

.bg-purple {
  background-color: var(--purple) !important;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .35s ease;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}
.child-view {
  position: absolute;
  transition: all .75s cubic-bezier(.55,0,.1,1);
}
.slide-left-enter, .slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(30px, 0);
  transform: translate(30px, 0);
}
.slide-left-leave-active, .slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-30px, 0);
  transform: translate(-30px, 0);
}
.scale-enter-active,
.scale-leave-active {
  transition: all 0.5s ease;
}

.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

</style>
