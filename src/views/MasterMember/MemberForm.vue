<template>
  <b-card>
    <template #header>
      <div class="d-flex justify-content-between">
        <h4>{{ model.fullname }}</h4>
        <b-link
          class="btn btn-primary"
          :to="{ name: 'master-member-table', query: prevRoute.query }"
          >Kembali</b-link
        >
      </div>
    </template>

    <b-form @submit="onSubmit">
      <b-form-group
        label="Nama Lengkap:"
        label-for="model-fullname"
        :invalid-feedback="modelMessagefullname"
      >
        <b-form-input
          id="model-fullname"
          v-model="model.fullname"
          :state="modelStatefullname"
          :validated="validated"
          class="shadow"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="Nomor Induk Kependudukan:"
        label-for="model-nik"
        :invalid-feedback="modelMessagenik"
      >
        <b-form-input
          id="model-nik"
          v-model="model.nik"
          :state="modelStatenik"
          :validated="validated"
          class="shadow"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="Nomor Telefon/HP:"
        label-for="model-phone_number"
        :invalid-feedback="modelMessagephone_number"
      >
        <b-form-input
          id="model-phone_number"
          v-model="model.phone_number"
          :state="modelStatephone_number"
          :validated="validated"
          class="shadow"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="Email:"
        label-for="model-email"
        :invalid-feedback="modelMessageemail"
      >
        <b-form-input
          id="model-email"
          v-model="model.email"
          placeholder="Email"
          :state="modelStateemail"
          :validated="validated"
          class="shadow"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="Alamat:"
        label-for="model-address"
        :invalid-feedback="modelMessageaddress"
      >
        <b-form-textarea
          id="model-address"
          v-model="model.address"
          placeholder="Jalan"
          :state="modelStateaddress"
          :validated="validated"
          class="shadow"
        ></b-form-textarea>
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
import { MemberModel } from "@/services/MemberService";
import { MemberService } from "@/services/MemberService";
export default {
  name: "MemberForm",
  data() {
    return {
      model: Object.assign({}, MemberModel),
      oldModel: Object.assign({}, MemberModel),
      prevRoute: {
        name: "master-member-table",
      },
      isNew: true,
      validated: null,
    };
  },
  methods: {
    getModel() {
      var modelId = this.$route.params.id;
      if (modelId) {
        new MemberService().Member.show(modelId).then((model) => {
          this.model = model.member;
          this.oldModel = Object.assign({}, model.member);
        });
        this.isNew = false;
      }
    },
    getImage() {
      var url = `https://randomuser.me/api/portraits/men/${this.model.id}.jpg`;
      var dob = parseInt(this.model.nik.substr(6, 2));
      if (dob > 40) {
        url = `https://randomuser.me/api/portraits/women/${this.model.id}.jpg`;
      }
      return url;
    },
    onSubmit(e) {
      e.preventDefault();
      var action = new MemberService();
      var result = null;
      this.validated = null;
      for (var p in this.model) {
        this["modelState" + p] = null;
        this["modelMessage" + p] = null;
      }
      if (this.isNew) {
        result = action.Member.post(this.model);
      } else {
        result = action.Member.update(this.model);
      }
      result
        .then(() => {
          this.$router.push({
            name: "master-member-table"
            
          });
        })
        .catch((e) => {
          if (e.status) {
            switch (e.status) {
              case 422:
                console.log(e.payload);
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
