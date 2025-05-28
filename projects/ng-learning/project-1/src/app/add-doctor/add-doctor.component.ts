import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

interface Doctor {
  name: string;
  img: string;
  specialization: string;
  experience: string;
  location: string;
  description: string;
}

@Component({
  selector: 'app-add-doctor',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HttpClientModule],
  templateUrl: './add-doctor.component.html',
  styleUrl: './add-doctor.component.css'
})
export class AddDoctorComponent {
  newDoctor: Doctor = {
    name: '',
    img: '',
    specialization: '',
    experience: '',
    location: '',
    description: ''
  };

  submitted = false;
  errorMessage = '';

  constructor(private http: HttpClient) {}

  addDoctor() {
    this.http.post('/api/doctors', this.newDoctor).subscribe({
      next: (response) => {
        console.log('Doctor added successfully:', response);
        this.submitted = true;
        this.newDoctor = {
          name: '',
          img: '',
          specialization: '',
          experience: '',
          location: '',
          description: ''
        };
      },
      error: (error) => {
        console.error('Error adding doctor:', error);
        this.errorMessage = 'Failed to add doctor. Please try again.';
      }
    });
  }
}
