import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeserviceService {
  constructor(private http: HttpClient) {}

  postemployeelogin(data: any): Observable<any> {
    return this.http.post('http://localhost:3003/employee/employeelogin', data);
  }
  postemployeeregister(data: any): Observable<any> {
    return this.http.post(
      'http://localhost:3003/employee/employeeregister',
      data
    );
  }
  employeelist(): Observable<any> {
    return this.http.get('http://localhost:3003/employee/getemployee');
  }
  updateemployee(id: String, data: any): Observable<any> {
    return this.http.put(
      `http://localhost:3003/employee/updateemployee/${id}`,
      data
    );
  }

  deleteemployee(id: String): Observable<any> {
    return this.http.delete(
      `http://localhost:3003/employee/deleteemployee/${id}`
    );
  }
  employeeprofile(id: String): Observable<any> {
    return this.http.get(`http://localhost:3003/employee/profileget/${id}`);
  }
  updateprofile(id: any, data: any): Observable<any> {
    return this.http.put(
      `http://localhost:3003/employee/updateemployee/${id}`,
      data
    );
  }
}
