import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DoctorService } from '../services/doctor.service';

@Component({
  selector: 'app-add-doctor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent {
  doctorForm: FormGroup;

  constructor(private fb: FormBuilder, private doctorService: DoctorService) {
    this.doctorForm = this.fb.group({
      name: ['', Validators.required],
      specialization: ['', Validators.required],
      location: ['', Validators.required],
      experience: [0, [Validators.required, Validators.min(0)]],
      rating: [0, [Validators.required, Validators.min(0), Validators.max(5)]]
    });
  }

  onSubmit() {
    if (this.doctorForm.valid) {
      this.doctorService.addDoctor(this.doctorForm.value).subscribe(response => {
        alert('Doctor added successfully!');
        this.doctorForm.reset();
      });
    }
  }
}
