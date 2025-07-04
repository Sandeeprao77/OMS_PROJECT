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
import { SuperadminserviceService } from '../superadminservice.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-superadminlogin',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './superadminlogin.component.html',
  styleUrl: './superadminlogin.component.css',
})
export class SuperadminloginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private superadminnservice: SuperadminserviceService,
    private router: Router,
    private toastr:ToastrService
  ) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      super_admin_mail: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$'),
        ],
      ],
      super_admin_password: [
        '',
        [Validators.required, Validators.minLength(4)],
      ],
    });
  }
  login() {
  if (this.loginForm.invalid) {
    this.toastr.warning('Please enter valid Email and Password', 'Warning', {
      positionClass: 'toast-top-center',
    });
    return;
  }

  this.superadminnservice.postsuperadminlogin(this.loginForm.value).subscribe({
    next: (res: any) => {
      localStorage.setItem('superadmin', JSON.stringify(res));
      this.toastr.success('Login successful!', 'Success', {
        positionClass: 'toast-top-center',
      });
      this.loginForm.reset(); // Optional: Clear form
      this.router.navigateByUrl('sp_dashboard');
    },
    error: () => {
      this.toastr.error(
        'Login failed. Please check your credentials.',
        'Error',
        {
          positionClass: 'toast-top-center',
        }
      );
    },
  });
}

}
