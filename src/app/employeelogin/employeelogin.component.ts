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
import { EmployeeserviceService } from '../employeeservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employeelogin',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './employeelogin.component.html',
  styleUrl: './employeelogin.component.css',
})
export class EmployeeloginComponent implements OnInit {
  loginForm!: FormGroup;
  formError: string = '';
  constructor(
    private fb: FormBuilder,
    private employeeservice: EmployeeserviceService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      emp_mail: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$'),
        ],
      ],
      emp_password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }
  login() {
    this.formError = '';
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.toastr.warning('Please enter valid Email and Password', 'Warning');
      this.formError = 'Please enter valid Email and Password.';
      return;
    }

    this.employeeservice.postemployeelogin(this.loginForm.value).subscribe({
      next: (res: any) => {
        localStorage.setItem('employee', JSON.stringify(res));
        this.toastr.success('Login successful!', 'Success', {
          positionClass: 'toast-top-center',
        });

        this.router.navigateByUrl('employee-dashboard');
      },
      error: (err) => {
        this.toastr.error(
          'Login failed. Please check your credentials.',
          'Error',
          {
            positionClass: 'toast-top-center',
          }
        );
        console.error(err);
      },
    });
  }
}
