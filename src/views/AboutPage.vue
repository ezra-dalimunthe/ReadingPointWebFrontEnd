<template>
  <div class="about">
    <h1>About</h1>
    <VueShowdown
      :markdown="fileContent"
      flavor="github"
      :options="{ emoji: true }"
      class="markdown"
    />
  </div>
</template>
<script>
export default {
  name: "AboutPage",
  data() {
    return {
      fileContent: "",
    };
  },
  methods: {
   async getContent(filename) {
      const request = new Request(`/docs/${filename}`);
      var response =  await fetch(request);

      if (response.status === 200) {
        this.fileContent = await response.text();
      } else {
        alert(response.status);
      }
    },
  },
  mounted() {
    this.getContent("01.md");
  },
};
</script>
