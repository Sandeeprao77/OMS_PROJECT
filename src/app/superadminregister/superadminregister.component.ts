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

@Component({
  selector: 'app-superadminregister',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './superadminregister.component.html',
  styleUrl: './superadminregister.component.css',
})
export class SuperadminregisterComponent implements OnInit {
  superadminregisterForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private superadminservice: SuperadminserviceService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.superadminregisterForm = this.fb.group({
      super_admin_name: ['', [Validators.required, Validators.minLength(3)]],
      super_admin_number: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
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
  register() {
    if (this.superadminregisterForm.value)
      this.superadminservice
        .postsuperadminregister(this.superadminregisterForm.value)
        .subscribe((res: any) => {});
    console.log(this.superadminregisterForm.value, 'data entry success');
    this.router.navigateByUrl('');
  }
}
