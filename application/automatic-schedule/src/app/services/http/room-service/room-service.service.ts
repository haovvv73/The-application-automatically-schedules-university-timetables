import { Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http/base-http.service';

@Injectable({
  providedIn: 'root'
})
export class RoomServiceService extends BaseHttpService {
  private url = 'room/'
  constructor() {
    super()
  }

  getRoom(){
    return this.get(this.url)
  }

  getRoomDetail(id:string){
    return this.get(this.url,id)
  }

  saveRoom(room :any){
    return this.post(this.url,room)
  }

  deleteRoom(id:string){
    return this.delete(this.url,id)
  }

  updateRoom(room:any){
    return this.put(this.url,room)
  }

}
