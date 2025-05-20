import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  showLoginFormFlag = true;
  showForgotPasswordFlag = false;

  // Form Data
  loginEmail = '';
  loginPassword = '';
  fullName = '';
  signUpEmail = '';
  signUpPhone = '';
  signUpPassword = '';
  confirmPassword = '';
  forgotEmail = '';

  constructor(private router: Router, private http: HttpClient) {}

  // Toggle between Login and Sign Up forms
  showSignUpForm() {
    this.showLoginFormFlag = false;
  }

  showLoginForm() {
    this.showLoginFormFlag = true;
    this.showForgotPasswordFlag = false;
  }

  // Toggle Forgot Password Popup
  showForgotPasswordPopup() {
    this.showForgotPasswordFlag = true;
  }

  closeForgotPasswordPopup() {
    this.showForgotPasswordFlag = false;
  }

  // Reset Password (Temporary Alert for Demo)
  resetPassword() {
    if (this.forgotEmail.trim() === "") {
      alert("Please enter your email.");
    } else {
      alert("Password has been updated.");
      this.closeForgotPasswordPopup();
    }
  }

  // Validate Login Function
  validateLogin() {
    const payload = { email: this.loginEmail, password: this.loginPassword };
    this.http.post<any>('http://192.168.0.63:3000/api/auth/login', payload).subscribe({
      next: (response: any) => {
        alert("Login successful!");
        this.router.navigate(['/home']);
      },
      error: (error) => {
        alert("Invalid credentials. Please try again.");
      }
    });
  }

  // Sign Up Function to Save User Credentials
  createAccount() {
    const payload = {
      fullName: this.fullName,
      email: this.signUpEmail,
      phone: this.signUpPhone,
      password: this.signUpPassword,
      confirmPassword: this.confirmPassword
    };
    this.http.post<any>('http://192.168.0.63:3000/api/auth/signup', payload).subscribe({
      next: () => {
        alert('Account created successfully. You can now log in.');
        this.showLoginForm();
      },
      error: (err) => {
        console.error('Signup error:', err);
        if (err.status === 400 && err.error.message === 'Email already registered') {
          alert('This email is already registered.');
        } else {
          alert('Signup failed: ' + JSON.stringify(err.error));
        }
      }
    });
  }
}
