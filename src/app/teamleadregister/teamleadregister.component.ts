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

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-teamleadregister',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './teamleadregister.component.html',
  styleUrl: './teamleadregister.component.css',
})
export class TeamleadregisterComponent implements OnInit {
  tlregisterForm!: FormGroup;
  formError: string = '';
  aid: any;
  constructor(
    private fb: FormBuilder,
    private teamleadservice: TeamleadService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    const a = JSON.parse(localStorage.getItem('admin') || '{}');
    this.aid = a.data._id;
    console.log(this.aid, 'aid');
    this.tlregisterForm = this.fb.group({
      TL_Name: ['', [Validators.required, Validators.minLength(3)]],
      TL_Mail: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.com$'),
        ],
      ],
      TL_Id: ['', [Validators.required, Validators.minLength(3)]],
      TL_Mobile_Number: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      TL_Password: ['', [Validators.required, Validators.minLength(4)]],
      admin_id: this.aid,
    });
  }
  register() {
    this.formError = '';
    if (this.tlregisterForm.invalid) {
      this.tlregisterForm.markAllAsTouched();
      this.toastr.warning('Please enter valid Email and Password', 'Warning');
      this.formError = 'Please enter valid Email and Password.';
      return;
    }

    this.teamleadservice
      .postteamleadregister(this.tlregisterForm.value)
      .subscribe({
        next: (res: any) => {
          this.toastr.success('Team Lead registered successfully!', 'Success', {
            positionClass: 'toast-top-center',
          });
          console.log(this.tlregisterForm.value, 'register successfully');
          this.tlregisterForm.reset();
          this.router.navigateByUrl('viewteamlead');
        },
        error: (err) => {
          this.toastr.error('Registration failed.', 'Error', {
            positionClass: 'toast-top-center',
          });
          console.error(err);
        },
      });
  }
}
