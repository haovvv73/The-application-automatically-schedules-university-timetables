import { Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http/base-http.service';

@Injectable({
  providedIn: 'root'
})
export class CourseServiceService extends BaseHttpService {
  private url = 'course/'
  constructor() {
    super()
  }

  getCourse(id:string){
    return this.get(this.url,id)
  }

  getCourseDetail(id:string){
    return this.get(this.url+'detail/',id)
  }

  getCourseAndRoom(id:string){
    return this.get(this.url+'courseAndRoom/',id)
  }

  saveCourse(schedule :any){
    return this.post(this.url,schedule)
  }

  deleteCourse(id:string){
    return this.delete(this.url,id)
  }

  updateCourse(schedule:any){
    return this.put(this.url,schedule)
  }
}
