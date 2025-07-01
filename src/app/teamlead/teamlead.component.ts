import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TeamleadService } from '../teamlead.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-teamlead',
  imports: [CommonModule,FormsModule,ReactiveFormsModule ],
  templateUrl: './teamlead.component.html',
  styleUrl: './teamlead.component.css'
})
export class TeamleadComponent implements OnInit{
  taskForm!:FormGroup;
  taskData:any;
  constructor(private fb:FormBuilder,private teamleadservice:TeamleadService,private router:Router){}
  ngOnInit(): void {
    this.taskForm=this.fb.group({
      task_name:['', Validators.required],
      task_description:['', Validators.required],
      task_duration:['', Validators.required]
      
      
    })
    // this.tasklist();
    
  }
  // tasklist(){
  //   this.teamleadservice.gettask().subscribe((res:any)=>{
  //     console.log(res,'taskdata');
  //     this.taskData=res;
  //   })

  // }
  task(){
    if(this.taskForm.value)
      this.teamleadservice.posttask(this.taskForm.value).subscribe((res:any)=>{
    console.log(this.taskForm.value,'task added successfully');
    this.router.navigateByUrl('viewtask')
    
    })
  }

}
