import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AdminserviceService } from '../adminservice.service';

@Component({
  selector: 'app-adminregister',
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterLink,],
  templateUrl: './adminregister.component.html',
  styleUrl: './adminregister.component.css'
})
export class AdminregisterComponent implements OnInit{
  adminregisterForm!:FormGroup;
  constructor( private fb:FormBuilder,private adminservice:AdminserviceService,private router:Router){}
  ngOnInit(): void {
    this.adminregisterForm=this.fb.group({
      Name:['',Validators.required],
      Email:['',Validators.required],
      Designation:['',Validators.required],
      Id:['',Validators.required],
      Number:['',Validators.required],
       password:['',Validators.required]
    })
    
  }
  register(){
    if(this.adminregisterForm.value)
      this.adminservice.postadminregister(this.adminregisterForm.value).subscribe((res:any)=>{
    })
    console.log(this.adminregisterForm.value,'data entry success')
    this.router.navigateByUrl('')
  }

}
