import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DoctorSearchComponent } from './doctor-search/doctor-search.component'; 
import { DoctorDetailsComponent } from './doctor-details/doctor-details.component';
import { AppointmentBookingComponent } from './appointment-booking/appointment-booking.component';
import { HomeComponent } from './home/home.component';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'doctor-search', component: DoctorSearchComponent },
  { path: 'doctor-details/:id', component: DoctorDetailsComponent },
  { path: 'appointment-booking', component: AppointmentBookingComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  ];

