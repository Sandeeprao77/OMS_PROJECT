import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AdminserviceService } from '../adminservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-adminregister',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './adminregister.component.html',
  styleUrl: './adminregister.component.css',
})
export class AdminregisterComponent implements OnInit {
  adminregisterForm!: FormGroup;
  formError: string = '';
  sid: any;
  constructor(
    private fb: FormBuilder,
    private adminservice: AdminserviceService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    const s = JSON.parse(localStorage.getItem('superadmin') || '{}');
    this.sid = s.data._id;
    console.log(this.sid, 'sid');
    this.adminregisterForm = this.fb.group({
      Name: ['', [Validators.required, Validators.minLength(3)]],
      Email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$'),
        ],
      ],
      Designation: ['', [Validators.required]],
      Id: ['', [Validators.required, Validators.minLength(3)]],
      Number: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      Password: ['', [Validators.required, Validators.minLength(4)]],
      superadmin_id: this.sid,
    });
  }
  register() {
    this.formError = '';
    if (this.adminregisterForm.invalid) {
      this.adminregisterForm.markAllAsTouched();
      this.toastr.warning('Please enter valid Email and Password', 'Warning');
      this.formError = 'Please enter valid Email and Password.';
      return;
    }
    this.adminservice
      .postadminregister(this.adminregisterForm.value)
      .subscribe({
        next: (res: any) => {
          this.toastr.success('Admin registered successfully!', 'Success', {
            positionClass: 'toast-top-center',
          });
          this.router.navigateByUrl('sp_dashboard/viewadmin');
        },
        error: (err) => {
          this.toastr.error('Failed to register admin.', 'Error', {
            positionClass: 'toast-top-center',
          });
          console.error(err);
        },
      });
  }
}
