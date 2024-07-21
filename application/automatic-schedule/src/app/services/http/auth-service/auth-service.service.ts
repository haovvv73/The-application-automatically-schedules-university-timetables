import { Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http/base-http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService extends BaseHttpService {
  private url = 'auth/'
  constructor() {
    super();
  }

  login(data : any){
    return this.post(this.url + 'login' ,data)
  }

  register(data : any){
    return this.post(this.url + 'register',data)
  }

  checkAdmin(data : any){
    return this.post(this.url + 'checkAdmin',data)
  }

  checkAuth(data : any){
    return this.post(this.url + 'checkUser',data)
  }
}
