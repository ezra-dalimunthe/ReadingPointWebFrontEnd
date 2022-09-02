<template>
  <div>
    <h1>Master Data Keanggotaan</h1>
    <router-view />
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
