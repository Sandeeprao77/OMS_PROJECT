import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AdminserviceService } from '../adminservice.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-a-profile',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './a-profile.component.html',
  styleUrl: './a-profile.component.css',
})
export class AProfileComponent implements OnInit {
  profileForm!: FormGroup;
  editForm!: FormGroup;
  admin: any;
  aid: any;
  constructor(
    private fb: FormBuilder,
    private adminservice: AdminserviceService,
    private router: Router,
    private toastr:ToastrService
  ) {}

  ngOnInit(): void {
    const a = JSON.parse(localStorage.getItem('admin') || '{}');
    console.log(a, 'admin');
    this.aid = a.data._id;
    console.log(this.aid, 'aid');

    this.profileForm = this.fb.group({
      Name: ['', Validators.required],
      Email: ['', Validators.required],
      Designation: ['', Validators.required],
      Id: ['', Validators.required],
      Number: ['', Validators.required],
    });
    this.editForm = this.fb.group({
      Name: ['', Validators.required],
      Email: ['', Validators.required],
      Designation: ['', Validators.required],
      Id: ['', Validators.required],
      Number: ['', Validators.required],
    });
    this.adminservice.getadminprofile(this.aid).subscribe((res: any) => {
      console.log(res);
      this.admin = res;
      console.log(this.admin, 'profile');

      this.profileForm.patchValue({
        Name: this.admin.Name,
        Email: this.admin.Email,
        Designation: this.admin.Designation,
        Id: this.admin.Id,
        Number: this.admin.Number,
      });
    });
  }
  editProfile(data: any) {
    console.log(data, 'edit data');
    this.aid = data._id;
    console.log(this.aid, 'aid');
    this.editForm.patchValue({
      Name: data.Name,
      Email: data.Email,
      Designation: data.Designation,
      Id: data.Id,
      Number: data.Number,
    });
    console.log(this.editForm.value);
  }
  update() {
  if (this.editForm.invalid) {
    this.toastr.warning('Please fill all required fields', 'Warning', {
      positionClass: 'toast-top-center',
    });
    return;
  }

  this.adminservice.updateprofile(this.aid, this.editForm.value).subscribe({
    next: (res: any) => {
      this.toastr.success('Profile updated successfully!', 'Success', {
        positionClass: 'toast-top-center',
      });
      window.location.reload();
    },
    error: (err) => {
      console.error(err);
      this.toastr.error('Profile update failed!', 'Error', {
        positionClass: 'toast-top-center',
      });
    }
  });
}

}
