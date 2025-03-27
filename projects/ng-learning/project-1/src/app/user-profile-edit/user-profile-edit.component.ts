import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
}

@Component({
  selector: 'app-user-profile-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-profile-edit.component.html',
  styleUrl: './user-profile-edit.component.css'
})
export class UserProfileEditComponent implements OnInit {
  userProfile: UserProfile = {
    name: '',
    email: '',
    phone: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // Load user data from an API (replace with your actual API endpoint)
    this.http.get<UserProfile>('/api/user/profile')
      .subscribe(data => {
        this.userProfile = data;
      });
  }

  onSubmit(): void {
    // Send updated data to the API (replace with your actual API endpoint)
    this.http.put('/api/user/profile', this.userProfile)
      .subscribe(() => {
        // Redirect to the user profile page after successful update
        this.router.navigate(['/user-profile']);
      });
  }

  onCancel(): void {
    this.router.navigate(['/user-profile']);
  }

}
