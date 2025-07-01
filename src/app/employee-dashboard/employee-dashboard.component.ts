import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-employee-dashboard',
  imports: [RouterLink,RouterOutlet],
  templateUrl: './employee-dashboard.component.html',
  styleUrl: './employee-dashboard.component.css'
})
export class EmployeeDashboardComponent implements OnInit{
  constructor(private router:Router){}
  ngOnInit(): void {
    
  }
  logout(){
    localStorage.removeItem('employee')
    this.router.navigateByUrl('employeelogin')
  }

}
