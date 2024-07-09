import { Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http/base-http.service';

@Injectable({
  providedIn: 'root'
})
export class ScheduleServiceService extends BaseHttpService {
  private url = 'schedule/'
  constructor() {
    super()
  }

  getSchedule(){
    return this.get(this.url)
  }

  getScheduleDetail(id:string){
    return this.get(this.url,id)
  }

  saveSchedule(schedule :any){
    return this.post(this.url,schedule)
  }

  deleteSchedule(id:string){
    return this.delete(this.url,id)
  }

  updateSchedule(schedule:any){
    return this.put(this.url,schedule)
  }
}
