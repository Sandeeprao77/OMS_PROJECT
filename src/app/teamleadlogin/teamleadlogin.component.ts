import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TeamleadService } from '../teamlead.service';
import { validateHeaderValue } from 'node:http';

@Component({
  selector: 'app-teamleadlogin',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './teamleadlogin.component.html',
  styleUrl: './teamleadlogin.component.css'
})
export class TeamleadloginComponent implements OnInit{
  loginForm!:FormGroup;
  constructor(private fb:FormBuilder,private teamleadservice:TeamleadService,private router:Router){}
  ngOnInit(): void {
    this.loginForm=this.fb.group({
      TL_Mail:['',[ Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$')]],
      TL_Password:['', [Validators.required,Validators.minLength(4)]]
    })
    
  }
  login(){
    if(this.loginForm.value)
      this.teamleadservice.postteamleadlogin(this.loginForm.value).subscribe((res:any)=>{
    console.log(res,'success')
    localStorage.setItem('teamlead', JSON.stringify(res));
    this.router.navigateByUrl('teamlead-dashboard');
    
    
  })
  }

}
