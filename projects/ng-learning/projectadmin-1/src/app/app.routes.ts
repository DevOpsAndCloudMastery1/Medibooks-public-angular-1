import { Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ManageDoctorsComponent } from './manage-doctors/manage-doctors.component';

export const routes: Routes = [
   { path: 'login', component: AdminLoginComponent },
   { path: 'admin-dashboard', component: AdminDashboardComponent },
   { path: 'manage-doctors', component: ManageDoctorsComponent },
   { path: '', redirectTo: '/login', pathMatch: 'full' },
   ];
