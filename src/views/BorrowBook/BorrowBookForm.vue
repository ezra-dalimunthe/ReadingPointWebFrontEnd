<template>
  <div>
    <SidebarSelectMember
      :show="openSidebarMember"
      @hidden="() => (openSidebarMember = false)"
      @selected="onMemberSelected"
    />
    <SidebarSelectBook
      :show="openSidebarBook"
      @hidden="() => (openSidebarBook = false)"
      @selected="onBookSelected"
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

            <b-card title="Buku Sedang Dipinjam">
              <b-table
                :fields="member_book_table.fields"
                :items="member_book_table.items"
                :empty-text="message_borrowed_book"
              >
                <template #cell(index)="data"> {{ data.index + 1 }}. </template>
                <template #cell(is_late)="data">
                  {{ data.item.is_late ? "Ya" : "Tidak" }}
                </template>
              </b-table>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </b-card>

    <b-alert :show="hasLimit" variant="warning">
      <h4 class="alert-heading">Limit Kuota Peminjaman</h4>
      <p>
        Anggota telah melampaui limit. Anggota tidak dapat meminjam buku sebelum
        melakukan
        <b-link :to="{ name: 'return-book-page' }">pengembalian</b-link>
      </p>
    </b-alert>
    <b-card v-if="!hasLimit">
      <template #header>
        <div class="d-flex justify-content-between">
          <h4>Buku</h4>
          <b-button
            variant="primary"
            :disabled="disableAddBook"
            @click="openSidebarBook = true"
            >Tambah</b-button
          >
        </div>
      </template>
      <b-table
        :fields="borrow_book_table.fields"
        :items="borrow_book_table.items"
        empty-text="Tambahkan buku untuk dipinjam"
      >
        <template #cell(index)="data"> {{ data.index + 1 }}. </template>
        <template #cell(action)="data">
          <b-button size="sm" variant="danger" @click="onRemoveBook(data.item)">
            <b-icon-x></b-icon-x>
          </b-button>
        </template>
      </b-table>

      <div class="d-flex justify-content-end">
        <b-button variant="primary" @click="onSubmitLoan">Simpan</b-button>
      </div>
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
  </div>
</template>

<script>
import DetailPart from "@/components/DetailPart";
import { BookModel } from "@/services/BookService";
import { MemberModel } from "@/services/MemberService";
import SidebarSelectMember from "@/components/SidebarSelectMember";
import SidebarSelectBook from "@/components/SidebarSelectBook";
import { BorrowBookService } from "@/services/BorrowBookService";

export default {
  name: "BorrowBookForm",
  components: { DetailPart, SidebarSelectMember, SidebarSelectBook },
  data() {
    return {
      member: MemberModel,
      book: BookModel,
      prevRoute: null,
      openSidebarMember: false,
      member_book_table: {
        fields: [
          { key: "index", label: "#", tdClass: "text-right" },
          {
            key: "book.title",
            label: "Judul",
            tdClass: (value, key, item) => {
              console.log(value, key, item);
              if (item.is_late) return "text-danger";
              return "";
            },
          },
          { key: "is_late", label: "Terlambat" },
        ],
        items: [],
        currentPage: 1,
        perPage: 100,
      },
      hasLimit: false,
      openSidebarBook: false,
      borrow_book_table: {
        fields: [
          { key: "index", label: "#", tdClass: "text-right", thClass: "index" },
          { key: "title", label: "Judul" },
          { key: "publisher", label: "Penerbit" },
          { key: "action", label: "Action", thClass: "action" },
        ],
        items: [],
        currentPage: 1,
        perPage: 100,
      },
      disableAddBook: false,
      toast: {
        title: "Peminjaman Buku",
        message: "",
        variant: "info",
        show: false,
      },
      message_borrowed_book: "Pilih anggota untuk melihat buku",
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

          this.hasLimit =
            this.borrow_book_table.items.length +
              this.member_book_table.items.length >
            3;
          this.disableAddBook =
            this.borrow_book_table.items.length +
              this.member_book_table.items.length >=
            3;
        }
      );
    },
    onBookSelected(book) {
      var alreadyInList = this.borrow_book_table.items.find((item) => {
        return item.id == book.id;
      });
      if (alreadyInList) {
        alert("alredyinlist");
        return;
      }
      this.borrow_book_table.items.push(book);
      this.openSidebarBook = false;
      this.disableAddBook =
        this.borrow_book_table.items.length +
          this.member_book_table.items.length >=
        3;
      this.hasLimit =
        this.borrow_book_table.items.length +
          this.member_book_table.items.length >
        3;
    },
    onRemoveBook(book) {
      var filtered = this.borrow_book_table.items.filter((item) => {
        return item.id != book.id;
      });

      this.borrow_book_table.items = filtered;
      this.disableAddBook =
        this.borrow_book_table.items.length +
          this.member_book_table.items.length >=
        3;
      this.hasLimit =
        this.borrow_book_table.items.length +
          this.member_book_table.items.length >
        3;
    },
    onSubmitLoan() {
      //validate if member is filled;
      var errors = [];
      if (this.member.id == 0) {
        errors.push("Peminjam belum dipilih");
      }
      if (this.borrow_book_table.items.length == 0) {
        errors.push("Tidak ada buku yang dipinjam.");
      }
      if (errors.length > 0) {
        var html = "<ul>";
        for (var i = 0; i < errors.length; i++) {
          html += "<li>" + errors[i] + "</li>";
        }
        html += "</ul>";
        this.toast.message = html;
        this.toast.variant = "warning";
        this.toast.show = true;
        return;
      }
      var book_ids = this.borrow_book_table.items.map((item) => {
        return item.id;
      });
      var form = {
        member_id: this.member.id,
        book_ids: book_ids,
      };
      new BorrowBookService().BorrowedBook.store(form).then(() => {
        this.toast.message = "<span>Data tersimpan</span>";
        this.toast.variant = "info";
        this.toast.show = true;
      });
      this.member = Object.assign({}, MemberModel);
      this.borrow_book_table.items = [];
      this.member_book_table.items = [];
    },
  },

  mounted() {},
  created() {},
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.prevRoute = from;
    });
  },
};
</script>
