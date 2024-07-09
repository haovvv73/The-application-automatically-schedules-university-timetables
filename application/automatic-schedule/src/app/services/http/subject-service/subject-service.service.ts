import { Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http/base-http.service';

@Injectable({
  providedIn: 'root'
})
export class SubjectServiceService extends BaseHttpService {
  private url = 'subject/'
  constructor() {
    super()
  }

  getSubject(){
    return this.get(this.url)
  }

  getSubjectDetail(id:string){
    return this.get(this.url,id)
  }

  saveSubject(subject :any){
    return this.post(this.url,subject)
  }

  deleteSubject(id:string){
    return this.delete(this.url,id)
  }

  updateSubject(subject:any){
    return this.put(this.url,subject)
  }
}
