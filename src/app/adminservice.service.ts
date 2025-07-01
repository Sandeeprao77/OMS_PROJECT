import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableInput } from 'rxjs';

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
adminlist():Observable<any>{
  return this.http.get("http://localhost:3003/admin/getadmin")
}
updateadmin(id:any,data:any):Observable<any>{
  return this.http.put(`http://localhost:3003/admin/updateadmin/${id}`,data)
}
deleteadmin(id:String):Observable<any>{
  return this.http.delete(`http://localhost:3003/admin/deleteadmin/${id}`)
}
getadminprofile(id:String):Observable<any>{
  return this.http.get(`http://localhost:3003/admin/getprofile/${id}`)
}
updateprofile(id:any,data:any):Observable<any>{
  return this.http.put(`http://localhost:3003/admin/updateadmin/${id}`,data)
}

}
