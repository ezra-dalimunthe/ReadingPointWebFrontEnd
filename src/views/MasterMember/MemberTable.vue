<template>
  <b-card body-class="p-0">
    <template #header>
      <div class="d-flex justify-content-between">
        <h4>Daftar Anggota</h4>
        <div class="d-flex justify-content-end">
          <CardTableHeaderFilter
            :filterFields="filterFields"
            @clear="onSearchClear"
            @onSearch="onSearch"
          />
          <b-link
            class="btn btn-outline-primary ml-4"
            :to="{ name: 'master-member-new' }"
            >Baru</b-link
          >
        </div>
      </div>
    </template>

    <b-table
      :id="`table_data` + this._uid"
      hover
      :busy="isBusy"
      :items="tableDataProvider"
      :fields="fields"
      :per-page="perPage"
      :current-page="currentPage"
      :filter="filter"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      stacked="sm"
      head-variant="primary"
      primary-key="id"
      tbody-tr-class="position-relative"
      ref="member_table"
    >
      <template #cell(index)="data">
        {{ (currentPage - 1) * perPage + data.index + 1 }}.
      </template>
      <template #cell(photo)="row">
        <b-link
          :to="{
            name: 'master-member-view',
            params: { id: row.item.id },
          }"
          class="stretched-link"
        >
          <b-img
            :src="getImage(row.item)"
            class="rounded"
            :alt="row.item.fullname"
          ></b-img>
        </b-link>
      </template>
    </b-table>
    <div class="d-flex justify-content-end">
      <b-pagination
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="perPage"
        :aria-controls="`table-item-` + _uid"
      ></b-pagination>
    </div>
  </b-card>
</template>
<script>
import { MemberService } from "@/services/MemberService";
import CardTableHeaderFilter from "@/components/CardTableHeaderFilter";
export default {
  name: "MemberTable",
  components: { CardTableHeaderFilter },
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
      totalRows: 1,
      filter: null,
      filterField: null,
      sortBy: "fullname",
      sortDesc: false,
      perPage: 20,
      isBusy: false,
      respondToRouteChanges: true,
      searchParam: null,
      searchField: "fullname",
      filterLabel: "Nama",
      filterFields: [
        { label: "Nama", value: "fullname" },
        { label: "NIK", value: "nik" },
        { label: "Email", value: "email" },
      ],
    };
  },
  methods: {
    tableDataProvider(ctx, callback) {
      var m = new MemberService();
      m.Member.table(
        this.currentPage,
        ctx.perPage,
        ctx.sortBy,
        ctx.sortDesc ? "desc" : "asc",
        ctx.filter
      ).then((payload) => {
        this.totalRows = payload.total;
        callback(payload.data);
      });
    },
    reload() {
      this.$refs.member_table.refresh();
    },
    onSearch(filter) {
      console.log(filter);
      this.filter = filter;
    },
    onSearchClear() {
      this.filter = null;
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
