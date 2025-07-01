import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminserviceService } from '../adminservice.service';

@Component({
  selector: 'app-viewadmin',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './viewadmin.component.html',
  styleUrl: './viewadmin.component.css'
})
export class ViewadminComponent implements OnInit{
  adminregdata:any;
  editForm!:FormGroup
  aid: any;
  constructor(private fb:FormBuilder,private adminservice:AdminserviceService){}
  ngOnInit(): void {
    this.editForm=this.fb.group({
      Name:['',Validators.required],
      Email:['',Validators.required],
      Designation:['', Validators.required],
      Id:['', Validators.required],
      Number:['',Validators.required],
      Password:['', Validators.required]
    })
    this.adminservice.adminlist().subscribe((res:any)=>{
      console.log(res);
      this.adminregdata=res;
    })
    
  }
  editAdmin(data:any){
    console.log(data,'edit data');
    this.aid=data._id;
    console.log(this.aid);
    this.editForm.patchValue({
      Name:data.Name,
      Email:data.Email,
      Designation:data.Designation,
      Id:data.Id,
      Number:data.Number,
      Password:data.password
    });
    console.log(this.editForm.value);

  }
  updateAdmin(){
    console.log(this.aid,this.editForm.value);
    this.adminservice.updateadmin(this.aid,this.editForm.value).subscribe((res:any)=>{
      console.log(res,'Admin updated')
      window.location.reload();
    })
  }
  deleteAdmin(id:string){
    if (confirm('Are you sure you want to delete this admin?')){
      this.adminservice.deleteadmin(id).subscribe((res:any)=>{
        console.log('Admin Deleted',res);
        window.location.reload();
      })
    }
  }

}
