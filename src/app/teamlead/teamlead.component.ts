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
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-teamlead',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './teamlead.component.html',
  styleUrl: './teamlead.component.css',
})
export class TeamleadComponent implements OnInit {
  taskForm!: FormGroup;
  taskData: any;
  constructor(
    private fb: FormBuilder,
    private teamleadservice: TeamleadService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.taskForm = this.fb.group({
      task_name: ['', Validators.required],
      task_description: ['', Validators.required],
      task_duration: ['', Validators.required],
    });
    // this.tasklist();
  }
  // tasklist(){
  //   this.teamleadservice.gettask().subscribe((res:any)=>{
  //     console.log(res,'taskdata');
  //     this.taskData=res;
  //   })

  // }
  task() {
    if (this.taskForm.invalid) {
      this.toastr.warning('Please fill all required fields.', 'Warning', {
        positionClass: 'toast-top-center',
      });
      return;
    }

    this.teamleadservice.posttask(this.taskForm.value).subscribe({
      next: (res: any) => {
        this.toastr.success('Task added successfully!', 'Success', {
          positionClass: 'toast-top-center',
        });
        this.router.navigateByUrl('viewtask');
      },
      error: (err) => {
        this.toastr.error('Failed to add task.', 'Error', {
          positionClass: 'toast-top-center',
        });
        console.error(err);
      },
    });
  }
}
