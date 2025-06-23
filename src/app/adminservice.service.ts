import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminserviceService {

  constructor(private http:HttpClient) { }

postadminlogin(data:any):Observable<any>{
  return this.http.post("http://localhost:3003/admin/adminlogin",data)
}
postadminregister(data:any):Observable<any>{
  return this.http.post("http://localhost:3003/admin/adminregister",data)
}
}
