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
import { TeamleadService } from '../teamlead.service';
import { validateHeaderValue } from 'node:http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-teamleadlogin',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './teamleadlogin.component.html',
  styleUrl: './teamleadlogin.component.css',
})
export class TeamleadloginComponent implements OnInit {
  loginForm!: FormGroup;
  formError: string = '';
  constructor(
    private fb: FormBuilder,
    private teamleadservice: TeamleadService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      TL_Mail: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$'),
        ],
      ],
      TL_Password: ['', [Validators.required, Validators.minLength(4)]],
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

    this.teamleadservice.postteamleadlogin(this.loginForm.value).subscribe({
      next: (res: any) => {
        localStorage.setItem('teamlead', JSON.stringify(res));
        this.toastr.success('Login successful!', 'Success', {
          positionClass: 'toast-top-center',
        });

        this.router.navigateByUrl('teamlead-dashboard');
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
