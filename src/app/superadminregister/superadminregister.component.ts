import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SuperadminserviceService } from '../superadminservice.service';

@Component({
  selector: 'app-superadminregister',
  imports: [CommonModule,ReactiveFormsModule,FormsModule,RouterLink],
  templateUrl: './superadminregister.component.html',
  styleUrl: './superadminregister.component.css'
})
export class SuperadminregisterComponent implements OnInit{
  superadminregisterForm!:FormGroup;
  constructor(private fb:FormBuilder,private superadminservice:SuperadminserviceService,private router:Router){}
  ngOnInit(): void {
    this.superadminregisterForm=this.fb.group({
      super_admin_name:['',Validators.required],
       super_admin_number:['',Validators.required],
        super_admin_mail:['',Validators.required],
         super_admin_password:['',Validators.required]
    })
    
  }
  register(){
    if(this.superadminregisterForm.value)
      this.superadminservice.postsuperadminregister(this.superadminregisterForm.value).subscribe((res:any)=>{
    })
    console.log(this.superadminregisterForm.value,'data entry success')
    this.router.navigateByUrl('')
  }

}
