import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
   { path: 'admin-dashboard', component: AdminDashboardComponent },
   { path: '', redirectTo: '/login', pathMatch: 'full' },
];
