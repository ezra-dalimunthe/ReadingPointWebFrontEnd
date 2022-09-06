<template>
  <div>
    <h1>Peminjaman Buku</h1>
    <router-view />
  </div>
</template>
<script>
export default {
  name: "BorrowBookPage",

  data() {
    return {
      documents: [],
      show: false,
    };
  },
};
</script>
