<template>
  <b-card body-class="p-0">
    <template #header>
      <div class="d-flex justify-content-between">
        <h4>Daftar Buku Dipinjam</h4>
        <div class="d-flex justify-content-end">
          <CardTableHeaderFilter
            :filterFields="filterFields"
            searchPlaceHolder="Database for Dummies"
            @clear="onSearchClear"
            @onSearch="onSearch"
          />
          <b-link
            class="btn btn-outline-primary ml-4"
            :to="{ name: 'borrow-book-form' }"
            >Peminjaman Baru</b-link
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
      <template #cell(title)="row">
        <b-link
          :to="{
            name: 'master-book-view',
            params: { id: row.item.id },
          }"
          class="stretched-link"
        >
         {{row.item.title}}
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
import { BookService } from "@/services/BookService";
import CardTableHeaderFilter from "@/components/CardTableHeaderFilter";
export default {
  name: "ReturnBookTable",
  components: { CardTableHeaderFilter },
  data() {
    return {
      fields: [
        { key: "index", label: "#", tdClass: "text-right" },
        { key: "title", label: "Judul" },
         { key: "author", label: "Pengarang", sortable: true },
        { key: "publisher", label: "Penerbit", sortable: true },
        { key: "subject", label: "subyek" },

        { key: "classification", label: "Class", sortable: true },
        { key: "copies", label: "Copies" },
      ],
      currentPage: 1,
      totalRows: 1,
      filter: null,
      filterField: null,
      sortBy: "title",
      sortDesc: false,
      perPage: 20,
      isBusy: false,
      respondToRouteChanges: true,

      filterFields: [
        { label: "Judul", value: "title" },
        { label: "Pengarang", value: "author" },
        { label: "Penerbit", value: "publisher" },
      ],
    };
  },
  methods: {
    tableDataProvider(ctx, callback) {
      var m = new BookService();
      m.Book.table(
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
