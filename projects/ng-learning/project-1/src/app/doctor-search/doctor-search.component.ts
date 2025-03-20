import { Component,OnInit } from '@angular/core';
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
  SearchTerm: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<{ doctors: Doctor[] }>('data/doctors.json')
      .subscribe(data => {
        this.doctors = data.doctors;
        this.filteredDoctors = [...this.doctors]; 
      });
  }

  // Use a getter to filter the doctors based on the search term
  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filterDoctors();
  }

  private _searchTerm: string = '';

  filterDoctors(): void {
    const filter = this.searchTerm.toLowerCase();
    this.filteredDoctors = this.doctors.filter(doctor =>
      doctor.name.toLowerCase().includes(filter) ||
      doctor.specialization.toLowerCase().includes(filter)
    );
  }
}

