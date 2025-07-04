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
  selector: 'app-viewemployee',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './viewemployee.component.html',
  styleUrl: './viewemployee.component.css',
})
export class ViewemployeeComponent implements OnInit {
  employeeregdata: any;
  editForm!: FormGroup;
  eid: any;
  constructor(
    private fb: FormBuilder,
    private employeeservice: EmployeeserviceService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.editForm = this.fb.group({
      emp_name: ['', Validators.required],
      emp_id: ['', Validators.required],
      emp_mail: ['', Validators.required],
      emp_number: ['', Validators.required],
      emp_password: ['', Validators.required],
    });
    this.employeeservice.employeelist().subscribe((res: any) => {
      console.log(res);
      this.employeeregdata = res;
    });
  }

  editEmployee(data: any) {
    console.log(data, 'edit data');
    this.eid = data._id;
    console.log(this.eid);
    this.editForm.patchValue({
      emp_name: data.emp_name,
      emp_id: data.emp_id,
      emp_mail: data.emp_mail,
      emp_number: data.emp_number,
      emp_password: data.emp_password,
    });
    console.log(this.editForm.value);
  }

  updateEmployee() {
    this.employeeservice
      .updateemployee(this.eid, this.editForm.value)
      .subscribe({
        next: (res: any) => {
          this.toastr.success('Employee updated successfully!', 'Success', {
            positionClass: 'toast-top-center',
          });
          window.location.reload();
        },
        error: (err) => {
          this.toastr.error('Failed to update employee.', 'Error', {
            positionClass: 'toast-top-center',
          });
          console.error(err);
        },
      });
  }

  deleteEmployee(id: string) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeservice.deleteemployee(id).subscribe({
        next: (res: any) => {
          this.toastr.success('Employee deleted successfully!', 'Success', {
            positionClass: 'toast-top-center',
          });
          window.location.reload();
        },
        error: (err) => {
          this.toastr.error('Failed to delete employee.', 'Error', {
            positionClass: 'toast-top-center',
          });
          console.error(err);
        },
      });
    }
  }
}
