import { Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
   { path: 'admin-login', component: AdminLoginComponent },
   { path: 'admin-dashboard', component: AdminDashboardComponent },
   { path: '', redirectTo: '/login', pathMatch: 'full' },
];
