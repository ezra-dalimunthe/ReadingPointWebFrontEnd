<template>
  <b-card>
    <template #header>
      <div class="d-flex justify-content-between">
        <h4>{{ model.fullname }}</h4>
        <div>
        <b-link
          v-if="prevRoute != null"
          class="btn btn-outline-primary"
          :to="{ name: prevRoute.name, query: prevRoute.query }"
          >Kembali</b-link
        >
        <b-link
          class="btn btn-outline-primary ml-4"
          :to="{ name: 'master-member-edit', params: { id: model.id } }"
          >Edit</b-link
        >
        </div>
      </div>
    </template>
    <b-row>
      <b-col md="3" sm="6">
        <div class="d-flex justify-content-center mb-4">
          <b-img :src="getImage()" fluid class="rounded"></b-img>
        </div>
      </b-col>
      <b-col>
        <DetailPart label="Nama" :value="model.fullname" />
        <DetailPart label="NIK" :value="model.nik" />
        <DetailPart label="Alamat" :value="model.address" />
        <DetailPart label="Email" :value="model.email" />
        <DetailPart label="Phone" :value="model.phone_number" />
      </b-col>
    </b-row>
  </b-card>
</template>
<script>
import DetailPart from "@/components/DetailPart";
import { MemberModel } from "@/services/MemberService";
import { MemberService } from "@/services/MemberService";
export default {
  name: "MemberDetail",
  components: { DetailPart },
  data() {
    return {
      model: MemberModel,
      prevRoute: null,
    };
  },
  methods: {
    getModel() {
      var modelId = this.$route.params.id;
      new MemberService().Member.show(modelId).then((model) => {
        this.model = model.member;
      });
    },
    getImage() {
      var url = `https://randomuser.me/api/portraits/men/${this.model.id}.jpg`;
      var dob = parseInt(this.model.nik.substr(6, 2));
      if (dob > 40) {
        url = `https://randomuser.me/api/portraits/women/${this.model.id}.jpg`;
      }
      return url;
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
