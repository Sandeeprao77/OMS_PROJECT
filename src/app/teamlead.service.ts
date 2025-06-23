import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamleadService {

  constructor(private http:HttpClient) { }

  posttask(data:any):Observable<any>{
    return this.http.post("http://localhost/3003/teamlead/addtask",data)
  }
  gettask():Observable<any>{
    return this.http.get("http://localhost/3003/teamlead/gettask")
  }
}
