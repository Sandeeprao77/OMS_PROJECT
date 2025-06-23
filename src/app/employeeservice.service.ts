import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeserviceService {

  constructor(private http:HttpClient) { }

  postemployeelogin(data:any):Observable<any>{
    return this.http.post("http://localhost:3003/employee/employeelogin",data)
  }
  postemployeeregister(data:any):Observable<any>{
    return this.http.post("http://localhost:3003/employee/employeeregister",data)
  }
}
