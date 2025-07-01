import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SuperadminserviceService } from '../superadminservice.service';

@Component({
  selector: 'app-superadminlogin',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './superadminlogin.component.html',
  styleUrl: './superadminlogin.component.css'
})
export class SuperadminloginComponent implements OnInit{
  loginForm!:FormGroup;
  constructor(private fb:FormBuilder,private superadminnservice:SuperadminserviceService,private router:Router){}
  ngOnInit(): void {
    this.loginForm=this.fb.group({
      super_admin_mail:['', [Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$')]],
      super_admin_password:['', [Validators.required,Validators.minLength(4)]]
    })
    
  }
  login(){
    if(this.loginForm.value)
      this.superadminnservice.postsuperadminlogin(this.loginForm.value).subscribe((res:any)=>{
    console.log(res,'success');
    localStorage.setItem('superadmin', JSON.stringify(res));
    
    
    this.router.navigateByUrl('sp_dashboard')
  })
  }

}
