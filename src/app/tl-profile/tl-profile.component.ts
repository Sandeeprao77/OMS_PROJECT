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
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tl-profile',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './tl-profile.component.html',
  styleUrl: './tl-profile.component.css',
})
export class TlProfileComponent implements OnInit {
  teamlead: any;
  profileForm!: FormGroup;
  editForm!: FormGroup;
  tid: any;
  constructor(
    private fb: FormBuilder,
    private teamleadservice: TeamleadService,
    private toastr:ToastrService
  ) {}
  ngOnInit(): void {
    const t = JSON.parse(localStorage.getItem('teamlead') || '{}');
    console.log(t, 'teamlead');
    this.tid = t.data._id;
    console.log(this.tid, 'tid');
    this.profileForm = this.fb.group({
      TL_Name: ['', Validators.required],
      TL_Mail: ['', Validators.required],
      TL_Id: ['', Validators.required],
      TL_Mobile_Number: ['', Validators.required],
    });
    this.editForm = this.fb.group({
      TL_Name: ['', Validators.required],
      TL_Mail: ['', Validators.required],
      TL_Id: ['', Validators.required],
      TL_Mobile_Number: ['', Validators.required],
    });
    this.teamleadservice.tlprofile(this.tid).subscribe((res: any) => {
      console.log(res);
      this.teamlead = res;
      console.log(this.teamlead, 'profile');
      this.profileForm.patchValue({
        TL_Name: this.teamlead.TL_Name,
        TL_Mail: this.teamlead.TL_Mail,
        TL_Id: this.teamlead.TL_Id,
        TL_Mobile_Number: this.teamlead.TL_Mobile_Number,
      });
    });
  }
  editProfile(data: any) {
    console.log(data, 'edit data');
    this.tid = data._id;
    console.log(this.tid, 'tid');
    this.editForm.patchValue({
      TL_Name: data.TL_Name,
      TL_Mail: data.TL_Mail,
      TL_Id: data.TL_Id,
      TL_Mobile_Number: data.TL_Mobile_Number,
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

  this.teamleadservice.updateprofile(this.tid, this.editForm.value).subscribe({
    next: (res: any) => {
      console.log(res, 'Profile updated');
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
