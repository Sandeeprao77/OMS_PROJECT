import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AdminserviceService } from '../adminservice.service';

@Component({
  selector: 'app-adminregister',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './adminregister.component.html',
  styleUrl: './adminregister.component.css'
})
export class AdminregisterComponent implements OnInit{
  adminregisterForm!:FormGroup;
  sid:any;
  constructor( private fb:FormBuilder,private adminservice:AdminserviceService,private router:Router){}
  ngOnInit(): void {
  const s=JSON.parse(localStorage.getItem('superadmin')|| '{}')
  this.sid=s.data._id
    console.log(this.sid,"sid")
    this.adminregisterForm=this.fb.group({
      Name:['',[Validators.required,Validators.minLength(3)]],
      Email:['',[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$')]],
      Designation:['',[Validators.required]],
      Id:['',[Validators.required,Validators.minLength(3)]],
      Number:['',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
       Password:['',[Validators.required,Validators.minLength(4)]],
       superadmin_id:this.sid
    })
    
  }
  register(){
    if(this.adminregisterForm.value)
      this.adminservice.postadminregister(this.adminregisterForm.value).subscribe((res:any)=>{
    })
    console.log(this.adminregisterForm.value,'data entry success')
   
    
     this.router.navigateByUrl('sp_dashboard/viewadmin');
  }

}
