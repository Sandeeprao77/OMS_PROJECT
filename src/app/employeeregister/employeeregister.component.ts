import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EmployeeserviceService } from '../employeeservice.service';
import { validateHeaderValue } from 'node:http';

@Component({
  selector: 'app-employeeregister',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './employeeregister.component.html',
  styleUrl: './employeeregister.component.css'
})
export class EmployeeregisterComponent implements OnInit{
  employeeregisterForm!:FormGroup;
  tid: any;
  constructor(private fb:FormBuilder,private employeeservice:EmployeeserviceService,private router:Router){}
  ngOnInit(): void {
    console.log("checking")
    const t=JSON.parse(localStorage.getItem('teamlead')||'{}')
    this.tid=t.data._id
    console.log(this.tid,"tid")
    this.employeeregisterForm=this.fb.group({
      emp_name:['', [Validators.required,Validators.minLength(3)]],
      emp_id:['',[ Validators.required,Validators.minLength(3)]],
      emp_mail:['',[ Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$')]],
      emp_number:['', [Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      emp_password:['', [Validators.required,Validators.minLength(4)]],
      teamlead_id:this.tid
      

    })
    
  }
  register(){
    if(this.employeeregisterForm.value)
      this.employeeservice.postemployeeregister(this.employeeregisterForm.value).subscribe((res:any)=>{
    
    })
    console.log(this.employeeregisterForm.value,'success')
    this.router.navigateByUrl('/teamlead-dashboard/viewemployee')
  }

}
