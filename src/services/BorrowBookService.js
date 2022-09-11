import { BaseDataService } from "./BaseDataService";
export class BorrowBookService {
  constructor() {
    this.dataService = new BaseDataService(
      process.env.VUE_APP_BORROW_SERVICE_URL
    );
  }
  get BorrowedBook() {
    var base = this;
    return {
      crudUrl: "/api/v1/book-borrow",
      tableUrl: "/api/v1/book-borrows",
      store(form) {
        return base.dataService.post(this.crudUrl, form);
      },
      table(
        page = 1,
        perPage = 20,
        sortBy = null,
        sortDir = "asc",
        filter = null
      ) {
        var params = {
          page: page,
          "per-page": perPage,
          "sort-by": sortBy,
          "sort-dir": sortDir,
          search: filter,
        };
        return base.dataService.get(`${this.tableUrl}`, params);
      },
      byMember(member_id) {
        var params = {
          page: 1,
          "per-page": 100,
          "sort-by": "loan_date",
          "sort-dir": "asc",
        };
        return base.dataService.get(
          `${this.crudUrl}/by-member/${member_id}`,
          params
        );
      },
    };
  }
}
export const BookModel = {
  id: 0,
  title: "",
  author: "",
  publisher: "",
  subject: "",
  classification: "",
  copies: 1,
};
