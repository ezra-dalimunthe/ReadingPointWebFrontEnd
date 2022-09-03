<template>
  <div>
    <h1>Master Data Keanggotaan</h1>
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  name: "MasterMemberPage",

  data() {
    return {
      documents: [],
      show: false,
    };
  },
};
</script>
