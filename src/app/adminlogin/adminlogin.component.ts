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
    private router: Router
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
    if (this.loginForm.value)
      this.adminservice
        .postadminlogin(this.loginForm.value)
        .subscribe((res: any) => {
          console.log(res, 'success');
          localStorage.setItem('admin', JSON.stringify(res));
          this.router.navigateByUrl('admin-dashboard');
        });
  }
}
