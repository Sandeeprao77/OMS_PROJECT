import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EmployeeserviceService } from '../employeeservice.service';

@Component({
  selector: 'app-employeeregister',
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterLink],
  templateUrl: './employeeregister.component.html',
  styleUrl: './employeeregister.component.css'
})
export class EmployeeregisterComponent implements OnInit{
  employeeregisterForm!:FormGroup;
  constructor(private fb:FormBuilder,private employeeservice:EmployeeserviceService,private router:Router){}
  ngOnInit(): void {
    this.employeeregisterForm=this.fb.group({
      emp_name:['', Validators.required],
      emp_id:['', Validators.required],
      emp_mail:['', Validators.required],
      emp_number:['', Validators.required],
      emp_password:['', Validators.required]
      

    })
    
  }
  register(){
    if(this.employeeregisterForm.value)
      this.employeeservice.postemployeeregister(this.employeeregisterForm.value).subscribe((res:any)=>{
    
    })
    console.log(this.employeeregisterForm.value,'success')
    this.router.navigateByUrl('')
  }

}
