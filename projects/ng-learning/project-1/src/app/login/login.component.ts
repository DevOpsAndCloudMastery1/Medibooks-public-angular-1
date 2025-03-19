import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  showLoginFormFlag = true;
  showForgotPasswordFlag = false;

  // Sample credentials for login
  validCredentials = {
    email: "publicuser@medibooks.com",
    password: "public@123"
  };

  userDatabase: { [email: string]: string } = {}; 

  // Form Data (Two-Way Binding)
  loginEmail = '';
  loginPassword = '';
  fullName = '';
  signUpEmail = '';
  signUpPhone = '';
  signUpPassword = '';
  forgotEmail = '';

  constructor(private router: Router) { }

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
    if ((this.loginEmail == this.validCredentials.email && this.loginPassword == this.validCredentials.password) ||
      (this.userDatabase[this.loginEmail] && this.userDatabase[this.loginEmail] == this.loginPassword)) {
      alert("Login successful!");
      this.router.navigate(['/home']); // Redirect to home
    }
    else {
      alert("Invalid credentials. Please try again.");
    }
  }

  // Sign Up Function to Save User Credentials
  createAccount() {
    if (this.signUpEmail in this.userDatabase) {
      alert("This email is already registered.");
    } else {
      this.userDatabase[this.signUpEmail] = this.signUpPassword;
      alert("Account created successfully. You can now log in.");
      this.showLoginForm();
    }
  }

}
