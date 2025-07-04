import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TeamleadService } from '../teamlead.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-viewteamlead',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './viewteamlead.component.html',
  styleUrl: './viewteamlead.component.css',
})
export class ViewteamleadComponent implements OnInit {
  teamleadregdata: any;
  editForm!: FormGroup;
  tid: any;
  constructor(
    private fb: FormBuilder,
    private teamleadserice: TeamleadService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.editForm = this.fb.group({
      TL_Name: ['', Validators.required],
      TL_Mail: ['', Validators.required],
      TL_Id: ['', Validators.required],
      TL_Mobile_Number: ['', Validators.required],
    });
    this.teamleadserice.teamleadlist().subscribe((res: any) => {
      console.log(res);
      this.teamleadregdata = res;
    });
  }
  editTl(data: any) {
    console.log(data, 'edit data');
    this.tid = data._id;
    console.log(this.tid);
    this.editForm.patchValue({
      TL_Name: data.TL_Name,
      TL_Mail: data.TL_Mail,
      TL_Id: data.TL_Id,
      TL_Mobile_Number: data.TL_Mobile_Number,
    });
    console.log(this.editForm.value);
  }

  updateTl() {
    if (this.editForm.invalid) {
      this.toastr.warning('Please fill all required fields.', 'Warning', {
        positionClass: 'toast-top-center',
      });
      return;
    }

    this.teamleadserice
      .updateteamlead(this.tid, this.editForm.value)
      .subscribe({
        next: (res: any) => {
          this.toastr.success('Team Lead updated successfully!', 'Success', {
            positionClass: 'toast-top-center',
          });
          window.location.reload();
        },
        error: (err) => {
          this.toastr.error('Failed to update Team Lead.', 'Error', {
            positionClass: 'toast-top-center',
          });
          console.error(err);
        },
      });
  }

  deleteTl(id: string) {
    if (confirm('Are you sure you want to delete this Team Lead?')) {
      this.teamleadserice.deleteteamlead(id).subscribe({
        next: (res: any) => {
          this.toastr.success('Team Lead deleted successfully!', 'Success', {
            positionClass: 'toast-top-center',
          });
          window.location.reload();
        },
        error: (err) => {
          this.toastr.error('Failed to delete Team Lead.', 'Error', {
            positionClass: 'toast-top-center',
          });
          console.error(err);
        },
      });
    }
  }
}
