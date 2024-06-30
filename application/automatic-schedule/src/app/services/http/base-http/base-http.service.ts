import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseHttpService {
  private domain = "http://localhost:4040/api/v1/"
  private http = inject(HttpClient);
  constructor() { }

  protected get(url : string, id : string | null = null){
    let domainWithId = this.domain + url
    if(id) domainWithId + '/' + id
    return this.http.get(domainWithId) 
  }

  protected post(url:string, data : any){
    return this.http.post(this.domain + url,data)
  }

  protected put(url:string, data : any){
    return this.http.put(this.domain + url,data)
  }

  protected delete(url:string, id : any){
    let domainWithId = this.domain + url + '/' + id
    return this.http.delete(domainWithId)
  }
}
