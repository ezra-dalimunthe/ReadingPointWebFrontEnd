<template>
  <b-card>
    <template #header>
      <div class="d-flex justify-content-between">
        <h4>{{ model.title }}</h4>
        <b-link
          class="btn btn-primary"
          :to="{ name: 'master-book-table', query: prevRoute.query }"
          >Kembali</b-link
        >
      </div>
    </template>

    <b-form @submit="onSubmit">
      <b-form-group
        label="Judul:"
        label-for="model-title"
        :invalid-feedback="modelMessagetitle"
      >
        <b-form-input
          id="model-title"
          v-model="model.title"
          :state="modelStatetitle"
          :validated="validated"
          class="shadow"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="Pengarang:"
        label-for="model-author"
        :invalid-feedback="modelMessageauthor"
      >
        <b-form-input
          id="model-author"
          v-model="model.author"
          :state="modelStateauthor"
          :validated="validated"
          class="shadow"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="Penerbit"
        label-for="model-publisher"
        :invalid-feedback="modelMessagepublisher"
      >
        <b-form-input
          id="model-publisher"
          v-model="model.publisher"
          :state="modelStatepublisher"
          :validated="validated"
          class="shadow"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="Subyek"
        label-for="model-subject"
        :invalid-feedback="modelMessagesubject"
      >
        <b-form-input
          id="model-subject"
          v-model="model.subject"
          placeholder="Fiction"
          :state="modelStatesubject"
          :validated="validated"
          class="shadow"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="Klasifikasi"
        label-for="model-classification"
        :invalid-feedback="modelMessageclassification"
        content-cols-lg="2"
      >
        <b-form-input
          id="model-classification"
          v-model="model.classification"
          placeholder="202"
          :state="modelStateclassification"
          :validated="validated"
          class="shadow text-right"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="Tahun Terbit"
        label-for="model-published_year"
        :invalid-feedback="modelMessagepublished_year"
        content-cols-lg="2"
      >
        <b-form-input
          id="model-published_year"
          v-model="model.published_year"
          :state="modelStatepublished_year"
          :validated="validated"
          class="shadow text-right"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="Jumlah Kopi"
        label-for="model-copies"
        :invalid-feedback="modelMessagecopies"
        content-cols-lg="2"
      >
        <b-form-input
          id="model-copies"
          v-model="model.copies"
          placeholder="1"
          :state="modelStatecopies"
          :validated="validated"
          class="shadow text-right"
        ></b-form-input>
      </b-form-group>
      <div class="d-flex justify-content-center mt-4">
        <b-button type="submit" variant="outline-primary">Submit</b-button>
        <b-button
          type="button"
          variant="outline-danger"
          class="ml-4"
          @click="onReset"
          >Reset</b-button
        >
      </div>
    </b-form>
  </b-card>
</template>

<script>
import { BookModel } from "@/services/BookService";
import { BookService } from "@/services/BookService";
export default {
  name: "BookForm",
  data() {
    return {
      model: Object.assign({}, BookModel),
      oldModel: Object.assign({}, BookModel),
      prevRoute: {
        name: "master-book-table",
      },
      isNew: true,
      validated: null,
    };
  },
  methods: {
    getModel() {
      var modelId = this.$route.params.id;
      if (modelId) {
        new BookService().Book.show(modelId).then((model) => {
          this.model = model.book;
          this.oldModel = Object.assign({}, model.book);
        });
        this.isNew = false;
      }
    },

    onSubmit(e) {
      e.preventDefault();
      var action = new BookService();
      var result = null;
      this.validated = null;
      for (var p in this.model) {
        this["modelState" + p] = null;
        this["modelMessage" + p] = null;
      }
      if (this.isNew) {
        result = action.Book.store(this.model);
      } else {
        result = action.Book.update(this.model);
      }
      result
        .then((payload) => {
          console.log(payload)
          this.$router.push({
            name: "master-book-view",
            params: { id: payload.model.id },
          });
        })
        .catch((e) => {
          console.log(e)
          if (e.status) {
            switch (e.status) {
              case 422:
                for (var p in this.model) {
                  this["modelState" + p] =
                    !Object.prototype.hasOwnProperty.call(e.payload, p);
                  this["modelMessage" + p] =
                    Object.prototype.hasOwnProperty.call(e.payload, p)
                      ? e.payload[p][0]
                      : null;
                }

                this.validated = true;
                break;
              default:
            }
          }
        });
    },
    onReset() {
      this.model = null;
      this.model = Object.assign({}, this.oldModel);
      for (var p in this.model) {
        this["modelState" + p] = null;
      }
    },
  },
  mounted() {
    this.getModel();
  },
  created() {
    for (var p in this.model) {
      this["modelState" + p] = null;
      this["modelMessage" + p] = null;
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.prevRoute = from;
    });
  },
};
</script>
