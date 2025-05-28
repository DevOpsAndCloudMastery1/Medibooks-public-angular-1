import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Doctor {
  id: string;
  name: string;
  img: string;
  specialization: string;
  experience: string;
  location: string;
  description: string;
}

@Component({
  selector: 'app-doctor-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.css']   // corrected here
})
export class DoctorDetailsComponent implements OnInit {
  doctorId: string | null = null;
  doctor: Doctor | undefined;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.doctorId = params['id'];

      if (this.doctorId) {
        // Call backend API to get a single doctor by id
        this.http.get<Doctor>(`http://192.168.0.63:3000/api/doctors/${this.doctorId}`).subscribe({
          next: doctor => {
            this.doctor = doctor;
            console.log('Fetched doctor from backend:', doctor);
          },
          error: err => {
            console.error('Error fetching doctor:', err);
          }
        });
      }
    });
  }
}
