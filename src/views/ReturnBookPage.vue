<template>
  <div>
    <h1>Pengembalian Buku</h1>
    <router-view />
  </div>
</template>
<script>
export default {
  name: "ReturnBookPage",

  data() {
    return {
      documents: [],
      show: false,
    };
  },
};
</script>
