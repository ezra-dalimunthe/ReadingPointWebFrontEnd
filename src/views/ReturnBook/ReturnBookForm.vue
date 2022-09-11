<template>
  <div>
    <SidebarSelectMember
      :show="openSidebarMember"
      @hidden="() => (openSidebarMember = false)"
      @selected="onMemberSelected"
    />

    <b-card>
      <template #header>
        <div class="d-flex justify-content-between">
          <h4>Peminjam</h4>
          <b-button variant="primary" @click="openSidebarMember = true"
            >Cari</b-button
          >
        </div>
      </template>

      <b-row class="mb-4">
        <b-col>
          <b-card-group deck>
            <b-card title="Data Anggota">
              <DetailPart label="Nama" :value="member.fullname" />
              <DetailPart label="NIK" :value="member.nik" />
              <DetailPart label="Alamat" :value="member.address" />
              <DetailPart label="Email" :value="member.email" />
              <DetailPart label="Phone" :value="member.phone_number" />
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </b-card>

    <b-card title="Buku Sedang Dipinjam">
      <b-table
        :fields="member_book_table.fields"
        :items="member_book_table.items"
        :empty-text="message_borrowed_book"
        thead-tr-class="d-none"
      >
        <template #thead-top>
          <b-tr>
            <b-th rowspan="2">#</b-th>
            <b-th rowspan="2">Judul</b-th>
            <b-th colspan="2" class="text-center">Tanggal</b-th>
            <b-th rowspan="2">Terlambat</b-th>
            <b-th rowspan="2">Action</b-th>
          </b-tr>
          <b-tr class="text-white">
            <b-th>Pinjam</b-th>
            <b-th>Kembali</b-th>
          </b-tr>
        </template>

        <template #cell(index)="data"> {{ data.index + 1 }}. </template>

        <template #cell(loan_date)="data">
          {{ $moment(data.item.loan_date).format("D MMM yyyy") }}
        </template>
        <template #cell(due_back_date)="data">
          {{ $moment(data.item.due_back_date).format("D MMM yyyy") }}
        </template>

        <template #cell(is_late)="data">
          <span v-if="data.item.is_late">
            {{ calculateDays(data.item.due_back_date) }} hari
          </span>
          <span v-else> - </span>
        </template>
        <template #cell(action)="data">
          <b-button
            size="sm"
            variant="danger"
            @click="onBookReturnedClick(data.item)"
            title="click to accept"
          >
            <b-icon-box-arrow-in-left></b-icon-box-arrow-in-left>
          </b-button>
        </template>
      </b-table>
    </b-card>
    <b-toast
      id="actionToast"
      v-model="toast.show"
      :title="toast.title"
      :variant="toast.variant"
      body-class="bg-white"
      :auto-hide-delay="300"
      solid
    >
      <template #toast-title>
        <div class="d-flex flex-grow-1 align-items-baseline">
          <b-img
            blank
            blank-color="#ff5555"
            class="mr-2"
            width="12"
            height="12"
          ></b-img>
          <strong class="mr-auto">{{ toast.title }}</strong>
        </div>
      </template>
      <div v-html="toast.message" />
    </b-toast>
    <b-modal
      ref="book-return-confirm-modal"
      title="Pengembalian Buku"
      @ok="onConfirmed"
      @cancel="onCancel"
    >
      Buku berikut akan dikembalikan:
      <template v-if="bookToReturn.book">
        <detail-part label="Judul" :value="bookToReturn.book.title" />
        <detail-part label="Pengarang" :value="bookToReturn.book.author" />
        <detail-part label="Penerbit" :value="bookToReturn.book.publisher" />
        <detail-part label="Tahun" :value="bookToReturn.book.published_year" />
      </template>
    </b-modal>
  </div>
</template>

<script>
import DetailPart from "@/components/DetailPart";
import { BookModel } from "@/services/BookService";
import { MemberModel } from "@/services/MemberService";
import SidebarSelectMember from "@/components/SidebarSelectMember";

import { BorrowBookService } from "@/services/BorrowBookService";
import { BookReturnService } from "@/services/BookReturnService";

export default {
  name: "ReturnBookForm",
  components: { DetailPart, SidebarSelectMember },
  data() {
    return {
      member: MemberModel,

      openSidebarMember: false,
      member_book_table: {
        fields: [
          { key: "index", label: "#", tdClass: "text-right" },
          {
            key: "book.title",
            label: "Judul",
            tdClass: (value, key, item) => {
              if (item.is_late) return "text-danger";
              return "";
            },
          },
          {
            key: "loan_date",
            label: "Tgl. Pinjam",
          },
          {
            key: "due_back_date",
            label: "Tgl. Harus Kembali",
          },
          { key: "is_late", label: "Terlambat", tdClass: "text-right" },
          {
            key: "action",
            label: "Action",
            tdClass: "action",
          },
        ],
        items: [],
        currentPage: 1,
        perPage: 100,
      },

      toast: {
        title: "Pengembalian Buku",
        message: "",
        variant: "info",
        show: false,
      },
      message_borrowed_book: "Pilih anggota untuk melihat buku",
      bookToReturn: { id: 0, book: Object.assign({}, BookModel) },
    };
  },
  methods: {
    onMemberSelected(member) {
      this.member = Object.assign({}, member);
      this.openSidebarMember = false;
      new BorrowBookService().BorrowedBook.byMember(this.member.id).then(
        (payload) => {
          this.member_book_table.items = payload.data;
          if (payload.data.length == 0) {
            this.message_borrowed_book = "Tidak ada buku yang dipinjam";
          }
        }
      );
    },

    calculateDays(due_date) {
      var given = this.$moment(due_date);
      var current = this.$moment().startOf("day");
      return current.diff(given, "days");
    },
    onBookReturnedClick(borrowedBook) {
      this.bookToReturn = Object.assign({}, borrowedBook);
      this.$refs["book-return-confirm-modal"].show();
    },
    onConfirmed() {
      var borrowedBook = this.bookToReturn;

      new BookReturnService().returnBook(borrowedBook).then((payload) => {
        console.log(payload)
        var filtered = this.member_book_table.items.filter((item) => {
          return item.id != borrowedBook.id;
        });

        this.member_book_table.items = filtered;
        if (this.member_book_table.items == 0) {
          this.message_borrowed_book = "Semua buku telah dikembalikan";
        }
      });
    },
    onCancel() {
      this.bookToReturn = null;
    },
  },

  mounted() {},
  created() {},
};
</script>
