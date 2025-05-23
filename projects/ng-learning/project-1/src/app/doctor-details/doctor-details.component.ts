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
  styleUrl: './doctor-details.component.css'
})
export class DoctorDetailsComponent  implements OnInit {
  doctorId: string | null = null;
  doctor: Doctor | undefined;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
  this.route.params.subscribe(params => {
    this.doctorId = params['id'];

    if (this.doctorId) {
      // Call backend API to get a single doctor by id
      this.http.get<Doctor>(`/api/doctors/${this.doctorId}`)
        .subscribe(doctor => {
          this.doctor = doctor;
          console.log('Fetched doctor:', this.doctor);
        }, error => {
          console.error('Error fetching doctor details:', error);
          this.doctor = undefined;  // clear doctor if error
        });
    }
  });
}


}
