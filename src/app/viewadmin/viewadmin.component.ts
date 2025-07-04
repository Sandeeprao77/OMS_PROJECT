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
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-viewadmin',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './viewadmin.component.html',
  styleUrl: './viewadmin.component.css',
})
export class ViewadminComponent implements OnInit {
  adminregdata: any;
  editForm!: FormGroup;
  aid: any;
  constructor(
    private fb: FormBuilder,
    private adminservice: AdminserviceService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.editForm = this.fb.group({
      Name: ['', Validators.required],
      Email: ['', Validators.required],
      Designation: ['', Validators.required],
      Id: ['', Validators.required],
      Number: ['', Validators.required],
      Password: ['', Validators.required],
    });
    this.adminservice.adminlist().subscribe((res: any) => {
      console.log(res);
      this.adminregdata = res;
    });
  }
  editAdmin(data: any) {
    console.log(data, 'edit data');
    this.aid = data._id;
    console.log(this.aid);
    this.editForm.patchValue({
      Name: data.Name,
      Email: data.Email,
      Designation: data.Designation,
      Id: data.Id,
      Number: data.Number,
      Password: data.password,
    });
    console.log(this.editForm.value);
  }
  updateAdmin() {
    this.adminservice.updateadmin(this.aid, this.editForm.value).subscribe({
      next: (res: any) => {
        this.toastr.success('Admin updated successfully!', 'Success', {
          positionClass: 'toast-top-center',
        });
        window.location.reload();
      },
      error: (err) => {
        this.toastr.error('Failed to update admin.', 'Error', {
          positionClass: 'toast-top-center',
        });
        console.error(err);
      },
    });
  }

  deleteAdmin(id: string) {
    if (confirm('Are you sure you want to delete this admin?')) {
      this.adminservice.deleteadmin(id).subscribe({
        next: (res: any) => {
          this.toastr.success('Admin deleted successfully!', 'Success', {
            positionClass: 'toast-top-center',
          });
          window.location.reload();
        },
        error: (err) => {
          this.toastr.error('Failed to delete admin.', 'Error', {
            positionClass: 'toast-top-center',
          });
          console.error(err);
        },
      });
    }
  }
}
