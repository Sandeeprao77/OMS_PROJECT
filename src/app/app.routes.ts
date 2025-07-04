import { Routes } from '@angular/router';
import { SuperadminregisterComponent } from './superadminregister/superadminregister.component';
import { SuperadminloginComponent } from './superadminlogin/superadminlogin.component';
import { AdminregisterComponent } from './adminregister/adminregister.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { EmployeeregisterComponent } from './employeeregister/employeeregister.component';
import { EmployeeloginComponent } from './employeelogin/employeelogin.component';
import { TeamleadComponent } from './teamlead/teamlead.component';
import { HomeComponent } from './home/home.component';
import { TeamleadloginComponent } from './teamleadlogin/teamleadlogin.component';
import { TeamleadregisterComponent } from './teamleadregister/teamleadregister.component';
import { SpDashboardComponent } from './sp-dashboard/sp-dashboard.component';
import { ViewadminComponent } from './viewadmin/viewadmin.component';
import { TeamleadDashboardComponent } from './teamlead-dashboard/teamlead-dashboard.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ViewteamleadComponent } from './viewteamlead/viewteamlead.component';
import { ViewemployeeComponent } from './viewemployee/viewemployee.component';
import { ViewtaskComponent } from './viewtask/viewtask.component';
import { SaProfileComponent } from './sa-profile/sa-profile.component';
import { AProfileComponent } from './a-profile/a-profile.component';
import { TlProfileComponent } from './tl-profile/tl-profile.component';
import { EmpProfileComponent } from './emp-profile/emp-profile.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { EdittaskComponent } from './edittask/edittask.component';

export const routes: Routes = [
  { path: 'superadminregister', component: SuperadminregisterComponent },
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: WelcomeComponent },
      { path: 'superadminlogin', component: SuperadminloginComponent },
      { path: 'adminlogin', component: AdminloginComponent },
      { path: 'teamleadlogin', component: TeamleadloginComponent },
      { path: 'employeelogin', component: EmployeeloginComponent },
    ],
  },

  {
    path: 'sp_dashboard',
    component: SpDashboardComponent,
    children: [
      { path: '', component: ViewadminComponent },
      { path: 'adminregister', component: AdminregisterComponent },
      { path: 'viewadmin', component: ViewadminComponent },
      { path: 'sa-profile', component: SaProfileComponent },
    ],
  },

  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    children: [
      { path: '', component: ViewteamleadComponent },
      { path: 'teamleadregister', component: TeamleadregisterComponent },
      { path: 'viewteamlead', component: ViewteamleadComponent },
      { path: 'a-profile', component: AProfileComponent },
    ],
  },

  {
    path: 'teamlead-dashboard',
    component: TeamleadDashboardComponent,
    children: [
      { path: '', component: ViewemployeeComponent },
      { path: 'employeeregister', component: EmployeeregisterComponent },
      { path: 'viewemployee', component: ViewemployeeComponent },
      { path: 'teamlead', component: TeamleadComponent },
      { path: 'edittask', component: EdittaskComponent },
      { path: 'tl-profile', component: TlProfileComponent },
    ],
  },

  {
    path: 'employee-dashboard',
    component: EmployeeDashboardComponent,
    children: [
      { path: '', component: ViewtaskComponent },

      { path: 'viewtask', component: ViewtaskComponent },
      { path: 'emp-profile', component: EmpProfileComponent },
    ],
  },
];
