<template>
  <b-card>
    <template #header>
      <div class="d-flex justify-content-between">
        <h4>{{ model.title }}</h4>
        <div>
          <b-link
            v-if="prevRoute != null"
            class="btn btn-outline-primary"
            :to="{ name: prevRoute.name, query: prevRoute.query }"
            >Kembali</b-link
          >
          <b-link
            class="btn btn-outline-primary ml-4"
            :to="{ name: 'master-book-edit', params: { id: model.id } }"
            >Edit</b-link
          >
        </div>
      </div>
    </template>
    <b-row>
      <b-col>
        <DetailPart label="Judul" :value="model.title" />
        <DetailPart label="Pengarang" :value="model.author" />
        <DetailPart label="Penerbit" :value="model.publisher" />
        <DetailPart label="Subject" :value="model.subject" />
        <DetailPart label="Classification" :value="model.classification" />
        <DetailPart label="Jumlah Kopi" :value="model.copies" />
      </b-col>
    </b-row>
  </b-card>
</template>
<script>
import DetailPart from "@/components/DetailPart";
import { BookModel } from "@/services/BookService";
import { BookService } from "@/services/BookService";
export default {
  name: "BookDetail",
  components: { DetailPart },
  data() {
    return {
      model: BookModel,
      prevRoute: {name:"master-book-table"},
    };
  },
  methods: {
    getModel() {
      var modelId = this.$route.params.id;
      new BookService().Book.show(modelId).then((model) => {
        this.model = model.book;
      });
    },
  },
  mounted() {
    this.getModel();
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.prevRoute = from;
    });
  },
};
</script>
