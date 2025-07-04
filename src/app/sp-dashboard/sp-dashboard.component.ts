import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { SuperadminserviceService } from '../superadminservice.service';

@Component({
  selector: 'app-sp-dashboard',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterLink,
  ],
  templateUrl: './sp-dashboard.component.html',
  styleUrl: './sp-dashboard.component.css',
})
export class SpDashboardComponent implements OnInit {
  profileForm!: FormGroup;
  pid: any;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private superadminservice: SuperadminserviceService
  ) {}
  ngOnInit(): void {
    this.profileForm = this.fb.group({
      super_admin_name: ['', Validators.required],
      super_admin_number: ['', Validators.required],
      super_admin_mail: ['', Validators.required],
      super_admin_password: ['', Validators.required],
    });
    // this.superadminservice.saprofile().subscribe((res:any)=>{
    //   console.log(res);

    // })
  }
  // profile(data:any){
  //   console.log(data,'profile data');
  //   this.pid=data._id;
  //   console.log(this.pid);
  //   this.profileForm.patchValue({
  //     super_admin_name:data.super_admin_name,
  //     super_admin_number:data.super_admin_number,
  //     super_admin_mail:data.super_admin_mail,
  //     super_admin_password:data.super_admin_password

  //   });
  // console.log(this.profileForm.value)
  // }

  logout() {
    localStorage.removeItem('superadmin');
    this.router.navigateByUrl('superadminlogin');
  }
}
