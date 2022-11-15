import { BaseDataService } from "./BaseDataService";

export class AuthService {
  constructor() {
    this.dataService = new BaseDataService(
      process.env.VUE_APP_AUTH_SERVICE_URL
    );
  }
  login(loginForm) {
    return this.dataService
      .post("/api/v1/auth/login", loginForm)
      
  }
  logout() {
    return this.dataService.get("/api/v1/auth/logout");
  }
}
