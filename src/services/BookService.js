export class BookService {
  constructor(dataService) {
    this.dataService = dataService;
    this.dataService.setBaseUrl(process.env.VUE_APP_BOOK_SERVICE_URL);
    this.crudUrl = "/api/v1/book";
  }
  get Book() {
    return {
      store(form) {
        return this.dataService.post(this.crudUrl, form);
      },
      update(form) {
        return this.dataService.put(`${this.crudUrl}/${form.id}`, form);
      },
      delete(id) {
        return this.dataService.delete(`${this.crudUrl}/${id}`);
      },
      show(id) {
        return this.dataService.get(`${this.crudUrl}/${id}`);
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
