import { BaseDataService } from "./BaseDataService";
import { BookModel } from "./BookService";

export class BookReturnService {
  constructor() {
    this.dataService = new BaseDataService(
      process.env.VUE_APP_BORROW_SERVICE_URL
    );
  }
  returnBook(form) {
    return this.dataService.put(`/api/v1/book-return/${form.id}`, form);
  }
}
export const BookReturnModel = {
  id: 0,
  book: BookModel,
  member_id: 0,
};
