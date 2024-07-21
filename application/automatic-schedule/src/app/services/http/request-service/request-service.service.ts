import { Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http/base-http.service';

@Injectable({
  providedIn: 'root'
})
export class RequestServiceService extends BaseHttpService{
  private url = 'request/'
  constructor() {
    super()
  }

  getRequest(id:string){
    return this.get(this.url,id)
  }

  getRequestByAdmin(id:string){
    return this.get(this.url + 'scheduleRequest/',id)
  }

  getRequestedByAdmin(id:string){
    return this.get(this.url + 'scheduleRequested/',id)
  }

  postRequest(request :any){
    return this.post(this.url,request)
  }

  deleteRequest(id:string){
    return this.delete(this.url,id)
  }

  updateRequest(request:any){
    return this.put(this.url,request)
  }
}
