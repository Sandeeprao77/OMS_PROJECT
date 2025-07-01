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
    private router: Router
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
    console.log(this.tid, this.editForm.value);
    this.teamleadservice
      .taskupdate(this.tid, this.editForm.value)
      .subscribe((res: any) => {
        console.log('Task updated', res);
        window.location.reload();
        this.tasklist();

        // this.teamleadservice
        //   .tasklist()
        //   .subscribe((data) => (this.taskdata = data));
      });
  }
}
