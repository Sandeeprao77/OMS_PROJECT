import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TeamleadService } from '../teamlead.service';
import { validateHeaderValue } from 'node:http';

@Component({
  selector: 'app-teamleadregister',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './teamleadregister.component.html',
  styleUrl: './teamleadregister.component.css'
})
export class TeamleadregisterComponent implements OnInit{
  tlregisterForm!:FormGroup;
  aid: any;
  constructor(private fb:FormBuilder,private teamleadservice:TeamleadService,private router:Router){}
  ngOnInit(): void {
    const a=JSON.parse(localStorage.getItem('admin')||'{}')
    this.aid=a.data._id
    console.log(this.aid,'aid')
    this.tlregisterForm=this.fb.group({
      TL_Name:['', [Validators.required,Validators.minLength(3)]],
      TL_Mail:['',[Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$')]],
      TL_Id:['', [Validators.required,Validators.minLength(3)]],
      TL_Mobile_Number:['',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      TL_Password:['',[Validators.required,Validators.minLength(4)]],
      admin_id:this.aid
    })
    
  }
  register(){
    if(this.tlregisterForm.value)
      this.teamleadservice.postteamleadregister(this.tlregisterForm.value).subscribe((res:any)=>{
    })
    console.log(this.tlregisterForm.value,'register successfully');
    this.router.navigateByUrl('viewteamlead')
  }

  }


