<template>
  <b-sidebar
    id="sidebar-book"
    title="book List"
    :visible="show"
    shadow
    aria-controls="sidebar-book"
    width="70%"
    bg-variant="gradient-light"
    header-class="bg-gradient-primary text-white"
    @hidden="onHidden"
  >
    <template #footer="{ hide }">
      <div
        class="d-flex justify-content-end bg-gradient-primary text-light align-items-center px-3 py-2"
      >
        <b-button size="sm" @click="hide">Close</b-button>
      </div>
    </template>
    <b-container>
      <b-card class="mt-4">
        <b-row>
          <b-col>
            <CardTableHeaderFilter
              :filterFields="filterFields"
              @clear="onSearchClear"
              @onSearch="onSearch"
              searchPlaceHolder="Microservices for.."
            />
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-table
              :id="`book_table` + this._uid"
              :busy="isBusy"
              :items="dataProvider"
              :fields="fields"
              :per-page="perPage"
              :current-page="currentPage"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
              :filter="filter"
              ref="book_table"
              @row-selected="onItemSelected"
              selectable
              select-mode="single"
            >
              <template #cell(index)="data">
                {{ (currentPage - 1) * perPage + data.index + 1 }}.
              </template>
            </b-table>
            <b-pagination
              v-model="currentPage"
              :total-rows="totalRows"
              :per-page="perPage"
              aria-controls="book-table"
            ></b-pagination>
          </b-col>
        </b-row>
      </b-card>
    </b-container>
  </b-sidebar>
</template>
<script>
import { BookService } from "@/services/BookService";
import CardTableHeaderFilter from "@/components/CardTableHeaderFilter";

export default {
  name: "SidebarSelectMember",
  components: { CardTableHeaderFilter },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      isBusy: false,
      currentPage: 1,
      perPage: 10,
      sortBy: "title",
      sortDesc: false,
      filter: null,
      totalRows: 0,
      fields: [
        { key: "index", label: "#", tdClass: "text-right" },
        { key: "title", label: "Judul", sortable: true },
        { key: "publisher", label: "Penerbit" },
        { key: "author", label: "Pengarang" },
      ],
      filterFields: [
        { label: "Judul", value: "title" },
        { label: "Penerbit", value: "publisher" },
        { label: "Pengarang", value: "author" },
      ],
    };
  },
  methods: {
    dataProvider(ctx, callback) {
      if (ctx.filter) {
        new BookService().Book.table(
          this.currentPage,
          ctx.perPage,
          ctx.sortBy,
          ctx.sortDesc ? "desc" : "asc",
          ctx.filter
        ).then((payload) => {
          this.totalRows = payload.total;
          callback(payload.data);
        });
      } else {
        this.currentPage = 1;
        this.totalRows = 0;
        callback([]);
      }
    },
    onSearchClear() {
      this.filter = null;
    },
    onSearch(filter) {
      this.filter = filter;
    },
    onItemSelected(book) {
      if (book && book.length) {
        this.$emit("selected", book[0]);
        this.filter = null;
      }
    },
    onHidden() {
      this.$emit("hidden");
    },
  },
};
</script>
