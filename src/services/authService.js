export class authService {
  constructor(dataService) {
    this.dataService = dataService;
  }
  login(loginForm) {
    return this.dataService
      .post("/api/v1/auth/login", loginForm)
     
  }
  logout(){
    return this.dataService.post("/api/v1/auth/logout")
  }
}
