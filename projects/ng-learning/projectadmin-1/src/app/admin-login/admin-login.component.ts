import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  
import { RouterModule } from '@angular/router'; 


@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  adminCredentials = {
    email: "admin@medibooks.com",
    password: "admin123"
  };

  email: string = "";
  password: string = "";
  
  constructor(private router: Router) {}
  
  handleLogin(event: Event) {
    event.preventDefault();

    console.log('Email:', this.email);  // Debugging email
    console.log('Password:', this.password);  // Debugging password
    
    if (this.email === this.adminCredentials.email && this.password === this.adminCredentials.password) {
      alert("Login successful!");
      this.router.navigate(['/admin-dashboard']); // ✅ Corrected navigation
    } else {
      alert("Invalid email or password. Please try again.");
    }
  }

  handleForgotPassword() {
    const email = prompt("Enter your email to reset password:");
    if (email === this.adminCredentials.email) {
      alert("Password reset instructions have been sent to your email.");
    } else {
      alert("Email not recognized. Please try again.");
    }
  }
}
