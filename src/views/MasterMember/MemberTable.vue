<template>
  <b-card title="Daftar Anggota">
    <b-link :to="{ name: 'master-member-new' }">New Member</b-link>
    <b-table
      :id="`table_data` + this._uid"
      hover
      :busy="isBusy"
      :items="tableDataProvider"
      :fields="fields"
      :per-page="perPage"
      :current-page="currentPage"
      :filter="filter"
      stacked="sm"
      head-variant="primary"
    >
      <template #cell(index)="data">
        {{ (currentPage - 1) * perPage + data.index + 1 }}.
      </template>
      <template #cell(photo)="row">
        <img :src="getImage(row.item)" />
      </template>
    </b-table>
  </b-card>
</template>
<script>
import { MemberService } from "@/services/MemberService";
export default {
  name: "MemberTable",
  data() {
    return {
      fields: [
        { key: "index", label: "#", tdClass: "text-right" },
        { key: "photo", label: "Photo" },
        { key: "fullname", label: "Nama", sortable: true },
        { key: "nik", label: "NIK" },

        { key: "phone_number", label: "Phone", sortable: true },
        { key: "email", label: "Email" },
      ],
      currentPage: 1,
      totalRows: 0,
      filter: null,
      sortBy: "id",
      sortDesc: false,
      perPage: 20,
      isBusy: false,
    };
  },
  methods: {
    tableDataProvider(ctx, callback) {
      var m = new MemberService();

      m.Member.table(
        this.currentPage,
        ctx.perPage,
        ctx.sortBy,
        ctx.sortDesc ? "desc" : "asc"
      ).then((payload) => {
        this.currentPage = payload.current_page;
        this.totalRows = payload.total;
        callback(payload.data);
      });
    },
    reload() {
      this.$refs.uat_table_ref.refresh();
    },
    getImage(data) {
      
      
      var url = `https://randomuser.me/api/portraits/thumb/men/${data.id}.jpg`;
      var dob = parseInt(data.nik.substr(6, 2));
      if (dob > 40) {
        url = `https://randomuser.me/api/portraits/thumb/women/${data.id}.jpg`;
      }
      return url;
    },
  },
  mounted() {},
};
</script>
