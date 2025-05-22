import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface Doctor {
  id: number;
  name: string;
  specialization: string;
  img: string;
}

@Component({
  selector: 'app-doctor-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './doctor-search.component.html',
  styleUrl: './doctor-search.component.css'
})
export class DoctorSearchComponent implements OnInit {
  doctors: Doctor[] = [];
  filteredDoctors: Doctor[] = [];
  private _searchTerm: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Updated to fetch doctors from backend
    this.http.get<{ doctors: Doctor[] }>('http://192.168.0.63:3000/api/doctors')
      .subscribe({
        next: (data) => {
          this.doctors = data.doctors;
          this.filteredDoctors = [...this.doctors];
        },
        error: (err) => {
          console.error('Error loading doctors:', err);
        }
      });
  }

  // Getter and setter for search term
  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filterDoctors();
  }

  // Filter doctors based on search term
  filterDoctors(): void {
    const filter = this.searchTerm.toLowerCase();
    this.filteredDoctors = this.doctors.filter(doctor =>
      doctor.name.toLowerCase().includes(filter) ||
      doctor.specialization.toLowerCase().includes(filter)
    );
  }
}
