import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';    // for handling template-driven forms


@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule ],
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  adminCredentials = {
    email: "admin@medibooks.com",
    password: "admin123"
  };
  
  constructor(private router: Router) {}
  
  handleLogin(event: Event) {
    event.preventDefault();
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;

    if (email === this.adminCredentials.email && password === this.adminCredentials.password) {
      alert("Login successful!");
      window.location.href = "admin-dashboard.html";  // You can replace this with routing for SPA
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
