import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EmployeeserviceService } from '../employeeservice.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-emp-profile',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './emp-profile.component.html',
  styleUrl: './emp-profile.component.css',
})
export class EmpProfileComponent implements OnInit {
  profileForm!: FormGroup;
  editForm!: FormGroup;
  employee: any;
  eid: any;

  constructor(
    private fb: FormBuilder,
    private employeeservice: EmployeeserviceService,
    private router: Router,
    private toastr:ToastrService
  ) {}
  ngOnInit(): void {
    const e = JSON.parse(localStorage.getItem('employee') || '{}');
    console.log(e, 'employee');
    this.eid = e.data._id;
    console.log(this.eid, 'eid');
    this.profileForm = this.fb.group({
      emp_name: ['', Validators.required],
      emp_id: ['', Validators.required],
      emp_mail: ['', Validators.required],
      emp_number: ['', Validators.required],
    });
    this.editForm = this.fb.group({
      emp_name: ['', Validators.required],
      emp_id: ['', Validators.required],
      emp_mail: ['', Validators.required],
      emp_number: ['', Validators.required],
    });
    this.employeeservice.employeeprofile(this.eid).subscribe((res: any) => {
      console.log(res);
      this.employee = res;

      console.log(this.employee, 'profile');
      this.profileForm.patchValue({
        emp_name: this.employee.emp_name,
        emp_id: this.employee.emp_id,
        emp_mail: this.employee.emp_mail,
        emp_number: this.employee.emp_number,
      });
    });
  }
  editProfile(data: any) {
    if (!data || !data._id) {
      console.error('Invalid data passed to editProfile:', data);
      return;
    }
    console.log(data, 'edit data');
    this.eid = data._id;
    console.log(this.eid, 'eid');
    this.editForm.patchValue({
      emp_name: data.emp_name,
      emp_id: data.emp_id,
      emp_mail: data.emp_mail,
      emp_number: data.emp_number,
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

  this.employeeservice.updateprofile(this.eid, this.editForm.value).subscribe({
    next: (res: any) => {
      console.log(res, 'profile updated');
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
