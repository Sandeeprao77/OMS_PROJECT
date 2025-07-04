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
  selector: 'app-viewtask',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './viewtask.component.html',
  styleUrl: './viewtask.component.css',
})
export class ViewtaskComponent implements OnInit {
  taskdata: any;
  editForm!: FormGroup;
  tid: any;
  constructor(
    private fb: FormBuilder,
    private teamleadservice: TeamleadService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.editForm = this.fb.group({
      task_status: ['', Validators.required],
    });
    this.tasklist();
  }
  tasklist() {
    this.teamleadservice.tasklist().subscribe((res: any) => {
      console.log(res);
      this.taskdata = res;
    });
  }

  editTask(task: any) {
    this.tid = task._id;
    this.editForm.patchValue({
      task_status: task.task_status,
    });
  }

  updateTask() {
    if (this.editForm.invalid) {
      this.toastr.warning('Please select a valid task status.', 'Warning', {
        positionClass: 'toast-top-center',
      });
      return;
    }

    this.teamleadservice.taskupdate(this.tid, this.editForm.value).subscribe({
      next: (res: any) => {
        this.toastr.success('Task updated successfully!', 'Success', {
          positionClass: 'toast-top-center',
        });
        this.tasklist();
        window.location.reload();
      },
      error: (err) => {
        this.toastr.error('Failed to update task.', 'Error', {
          positionClass: 'toast-top-center',
        });
        console.error(err);
      },
    });
  }
}
