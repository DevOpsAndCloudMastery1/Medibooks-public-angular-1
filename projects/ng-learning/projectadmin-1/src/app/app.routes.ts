import { Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ManageDoctorsComponent } from './manage-doctors/manage-doctors.component';
import { ManageAppointmentsComponent } from './manage-appointments/manage-appointments.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { AdminReportsComponent } from './admin-reports/admin-reports.component';

export const routes: Routes = [
   { path: 'login', component: AdminLoginComponent },
   { path: 'admin-dashboard', component: AdminDashboardComponent },
   { path: 'manage-doctors', component: ManageDoctorsComponent },
   { path: 'manage-appointments', component: ManageAppointmentsComponent },
   { path: 'manage-users', component: ManageUsersComponent },
   { path: 'admin-reports', component: AdminReportsComponent },
   { path: '', redirectTo: '/login', pathMatch: 'full' },
   ];
