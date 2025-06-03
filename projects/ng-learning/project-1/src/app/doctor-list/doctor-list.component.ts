import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrl: './doctor-list.component.css',
  imports: [],
})
export class DoctorListComponent implements OnInit {
  doctors: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://192.168.0.63:3000/api/doctors').subscribe(data => {
      this.doctors = data;
    });
  }

  editDoctor(id: string): void {
    this.router.navigate(['/edit-doctor', id]);
  }

  deleteDoctor(id: string): void {
    this.http.delete(`http://192.168.0.63:3000/api/doctors/${id}`).subscribe(() => {
      this.doctors = this.doctors.filter(doc => doc.id !== id);
    });
  }
}
