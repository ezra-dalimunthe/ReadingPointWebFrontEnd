<template>
  <b-sidebar
    id="sidebar-member"
    title="Member List"
    :visible="show"
    shadow
    aria-controls="sidebar-member"
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
            />
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-table
              :id="`member_table` + this._uid"
              :busy="isBusy"
              :items="dataProvider"
              :fields="fields"
              :per-page="perPage"
              :current-page="currentPage"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
              :filter="filter"
              ref="member_table"
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
              aria-controls="member-table"
            ></b-pagination>
          </b-col>
        </b-row>
      </b-card>
    </b-container>
  </b-sidebar>
</template>
<script>
import { MemberService } from "@/services/MemberService";
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
      sortBy: "fullname",
      sortDesc: false,
      filter: null,
      totalRows: 0,
      fields: [
        { key: "index", label: "#", tdClass: "text-right" },
        { key: "fullname", label: "Nama", sortable: true },
        { key: "nik", label: "NIK" },
        { key: "phone_number", label: "Phone" },
      ],
      filterFields: [
        { label: "Nama", value: "fullname" },
        { label: "NIK", value: "nik" },
        { label: "Phone", value: "phone_number" },
      ],
    };
  },
  methods: {
    dataProvider(ctx, callback) {
      if (ctx.filter) {
        new MemberService().Member.table(
          this.currentPage,
          ctx.perPage,
          ctx.sortBy,
          ctx.sortDesc ? "desc" : "asc",
          ctx.filter
        )
          .then((payload) => {
            this.totalRows = payload.total;
            callback(payload.data);
          })
          .catch((e) => {
            console.log(e);
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
    onItemSelected(member) {
      if (member && member.length) {
        this.$emit("selected", member[0]);
      }
    },
    onHidden() {
      this.$emit("hidden");
    },
  },
};
</script>
