import { BaseDataService } from "./BaseDataService";
export class BookService {
  constructor() {
    this.dataService = new BaseDataService(
      process.env.VUE_APP_BOOK_SERVICE_URL
    );
  }
  get Book() {
    var base = this;
    return {
      crudUrl: "/api/v1/book",
      tableUrl: "/api/v1/books",
      store(form) {
        return base.dataService.post(this.crudUrl, form);
      },
      update(form) {
        return base.dataService.put(`${this.crudUrl}/${form.id}`, form);
      },
      delete(id) {
        return base.dataService.delete(`${this.crudUrl}/${id}`);
      },
      show(id) {
        return base.dataService.get(`${this.crudUrl}/${id}`);
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
