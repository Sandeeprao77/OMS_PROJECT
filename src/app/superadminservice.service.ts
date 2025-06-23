import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuperadminserviceService {

  constructor(private http:HttpClient) { }
  postsuperadminlogin(data:any):Observable<any>{
    return this.http.post("http://localhost:3003:superadmin/superadminlogin",data)
  }
  postsuperadminregister(data:any):Observable<any>{
    return this.http.post("http://localhost:3003/superadmin/superadminregister",data)
  }
}
