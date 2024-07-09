import { Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http/base-http.service';

@Injectable({
  providedIn: 'root'
})
export class LecturerServiceService extends BaseHttpService {
  private url = 'lecturer/'
  constructor() {
    super()
  }

  getLecturer(){
    return this.get(this.url)
  }

  getLecturerDetail(id:string){
    return this.get(this.url,id)
  }

  saveLecturer(lecturer :any){
    return this.post(this.url,lecturer)
  }

  deleteLecturer(id:string){
    return this.delete(this.url,id)
  }

  updateLecturer(lecturer:any){
    return this.put(this.url,lecturer)
  }
}
