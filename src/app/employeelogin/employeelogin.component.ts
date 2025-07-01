import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EmployeeserviceService } from '../employeeservice.service';

@Component({
  selector: 'app-employeelogin',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './employeelogin.component.html',
  styleUrl: './employeelogin.component.css'
})
export class EmployeeloginComponent implements OnInit{
  loginForm!:FormGroup;
  constructor(private fb:FormBuilder,private employeeservice:EmployeeserviceService,private router:Router){}
  ngOnInit(): void {
    this.loginForm=this.fb.group({
      emp_mail:['', [Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$')]],
      emp_password:['',[Validators.required,Validators.minLength(4)]]
    })
  }
  login(){
    if(this.loginForm.value)
      this.employeeservice.postemployeelogin(this.loginForm.value).subscribe((res:any)=>{
     console.log(res,'success');
     localStorage.setItem('employee', JSON.stringify(res));
     this.router.navigateByUrl('employee-dashboard');

    })
   
  }

}
