<template>
  <div>
    <h1>Master Data Buku</h1>
    <router-view />
  </div>
</template>
<script>
export default {
  name: "MasterBookPage",

  data() {
    return {
      documents: [],
      show: false,
    };
  },
};
</script>
