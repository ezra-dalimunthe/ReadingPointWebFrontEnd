export class uatService {
  constructor(dataService) {
    this.dataService = dataService;
    this.crudUrl = "/api/v1/uatApp";
  }
  store(form) {
    return this.dataService.post(this.crudUrl, form);
  }
  update(form) {
    return this.dataService.put(`${this.crudUrl}/${form.id}`, form);
  }
  delete(id) {
    return this.dataService.delete(`${this.crudUrl}/${id}`);
  }
}
export const uatModel = {
  id: 0,
  project_name: "",
  application_name: "Untitled UAT",
  description: "",
  application_type_id: "",
  author: "",
  created_at: "",
  updated_at: "",
};
export const applicationType = [
  { text: "Web Monolith", value: 0 },
  { text: "Web Backend", value: 1 },
  { text: "Web FrontEnd", value: 2 },
  { text: "Smartphone", value: 3 },
];
