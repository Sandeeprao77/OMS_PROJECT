import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeamleadService {
  constructor(private http: HttpClient) {}

  posttask(data: any): Observable<any> {
    return this.http.post('http://localhost:3003/teamlead/addtask', data);
  }
  gettask(): Observable<any> {
    return this.http.get('http://localhost:3003/teamlead/gettask');
  }
  postteamleadregister(data: any): Observable<any> {
    return this.http.post(
      'http://localhost:3003/teamlead/teamleadregister',
      data
    );
  }
  postteamleadlogin(data: any): Observable<any> {
    return this.http.post('http://localhost:3003/teamlead/teamleadlogin', data);
  }

  teamleadlist(): Observable<any> {
    return this.http.get('http://localhost:3003/teamlead/getteamlead');
  }
  updateteamlead(id: String, data: any): Observable<any> {
    return this.http.put(
      `http://localhost:3003/teamlead/updateteamlead/${id}`,
      data
    );
  }
  deleteteamlead(id: String): Observable<any> {
    return this.http.delete(
      `http://localhost:3003/teamlead/deleteteamlead/${id}`
    );
  }
  tasklist(): Observable<any> {
    return this.http.get('http://localhost:3003/teamlead/gettask');
  }
  updatetask(id: String, data: any): Observable<any> {
    return this.http.put(
      `http://localhost:3003/teamlead/updatetask/${id}`,
      data
    );
  }
  deletetask(id: String): Observable<any> {
    return this.http.delete(`http://localhost:3003/teamlead/deletetask/${id}`);
  }
  tlprofile(id: string): Observable<any> {
    return this.http.get(`http://localhost:3003/teamlead/profileget/${id}`);
  }
  updateprofile(id: any, data: any): Observable<any> {
    return this.http.put(
      `http://localhost:3003/teamlead/updateteamlead/${id}`,
      data
    );
  }
  taskupdate(id: any, data: any): Observable<any> {
    return this.http.put(
      `http://localhost:3003/teamlead/updatetask/${id}`,
      data
    );
  }
  taskdelete(id: String): Observable<any> {
    return this.http.delete(`http://localhost:3003/teamlead/deletetask/${id}`);
  }
}
