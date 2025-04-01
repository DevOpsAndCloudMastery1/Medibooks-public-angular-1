import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Added this for routerLink support
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  // Optional: Properties for dynamic data
  totalAppointments: number = 120;
  totalUsers: number = 350;
  totalDoctors: number = 45;

  constructor() { }

  logout(): void {
    // In a real app, you'd likely call an authentication service here
    console.log('Logout button clicked');
    alert('You have logged out!');
    window.location.href = 'login.html'; 
  }
}
