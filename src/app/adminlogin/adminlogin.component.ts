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
  selector: 'app-adminlogin',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './adminlogin.component.html',
  styleUrl: './adminlogin.component.css',
})
export class AdminloginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private adminservice: AdminserviceService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      Email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$'),
        ],
      ],
      Password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.toastr.warning('Please enter valid Email and Password', 'Warning');
      return;
    }

    this.adminservice.postadminlogin(this.loginForm.value).subscribe({
      next: (res: any) => {
        localStorage.setItem('admin', JSON.stringify(res));
        this.toastr.success('Login successful!', 'Success', {
          positionClass: 'toast-top-center',
        });
        this.router.navigateByUrl('admin-dashboard');
      },
      error: () => {
        this.toastr.error(
          'Login failed. Please check your credentials.',
          'Error'
        );
      },
    });
  }
}
