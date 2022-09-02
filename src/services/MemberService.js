import { BaseDataService } from "./BaseDataService";

export class MemberService {
  constructor() {
    this.dataService = new BaseDataService(
      process.env.VUE_APP_MEMBER_SERVICE_URL
    );
  }
  get Member() {
    var base = this;
    return {
      crudUrl: "/api/v1/member",
      tableUrl: "/api/v1/members",
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
      table(page = 1, perPage = 20, sortBy = null, sortDir = "asc") {
        var params = {
          page: page,
          "per-page": perPage,
          "sort-by": sortBy,
          "sort-dir": sortDir,
        };
        return base.dataService.get(`${this.tableUrl}`, params);
      },
    };
  }
}
export const MemberModel = {
  id: 0,
  fullname: "",
  nik: "",
  address: "",
  phone_number: "",
  email: "",
  status_id: 1,
};
