import { Routes } from '@angular/router';
import { SuperadminregisterComponent } from './superadminregister/superadminregister.component';
import { SuperadminloginComponent } from './superadminlogin/superadminlogin.component';
import { AdminregisterComponent } from './adminregister/adminregister.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { EmployeeregisterComponent } from './employeeregister/employeeregister.component';
import { EmployeeloginComponent } from './employeelogin/employeelogin.component';
import { TeamleadComponent } from './teamlead/teamlead.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {path:"superadminregister",component:SuperadminregisterComponent},
    {path:"", component:HomeComponent},
    {path:"superadminlogin",component:SuperadminloginComponent},
    {path:"adminregister",component:AdminregisterComponent},
    {path:"adminlogin",component:AdminloginComponent},
    {path:"employeeregister",component:EmployeeregisterComponent},
    {path:"employeelogin",component:EmployeeloginComponent},
    {path:"teamlead",component:TeamleadComponent}
];
