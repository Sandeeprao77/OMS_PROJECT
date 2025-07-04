import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SuperadminserviceService } from '../superadminservice.service';

@Component({
  selector: 'app-sa-profile',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './sa-profile.component.html',
  styleUrl: './sa-profile.component.css',
})
export class SaProfileComponent implements OnInit {
  profileForm!: FormGroup;
  superadmin: any;
  sid: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private superadminservice: SuperadminserviceService
  ) {}
  ngOnInit(): void {
    const s = JSON.parse(localStorage.getItem('superadmin') || '{}');
    console.log(s, 'superadmin');
    this.sid = s.data._id;
    console.log(this.sid, 'sid');

    this.profileForm = this.fb.group({
      super_admin_name: ['', Validators.required],
      super_admin_number: ['', Validators.required],
      super_admin_mail: ['', Validators.required],
    });

    this.superadminservice.getsaprofile(this.sid).subscribe((res: any) => {
      console.log(res);
      this.superadmin = res;
      console.log(this.superadmin, 'profile');

      this.profileForm.patchValue({
        super_admin_name: this.superadmin.super_admin_name,
        super_admin_number: this.superadmin.super_admin_number,
        super_admin_mail: this.superadmin.super_admin_mail,
      });
    });
  }
}
