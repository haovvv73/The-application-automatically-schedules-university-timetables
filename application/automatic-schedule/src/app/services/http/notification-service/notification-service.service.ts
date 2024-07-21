import { Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http/base-http.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationServiceService extends BaseHttpService {
  private url = 'notification/'
  constructor() {
    super()
  }

  getNotification(id:string){
    return this.get(this.url,id)
  }

  // saveNotification(notification :any){
  //   return this.post(this.url,notification)
  // }

  deleteNotification(id:string){
    return this.delete(this.url,id)
  }

}
