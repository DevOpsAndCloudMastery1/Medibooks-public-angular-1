import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router: Router) { }

  logout(): void {
    console.log('Logout button clicked');
    alert('You have logged out!');
    this.router.navigate(['/login']); // Navigate to login page instead of reloading
  }
  
}
