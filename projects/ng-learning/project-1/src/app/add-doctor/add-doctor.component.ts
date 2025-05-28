import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DoctorService } from '../services/doctor.service';

@Component({
  standalone: true,
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css]
})
export class AddDoctorComponent {
  doctorForm: FormGroup;

  constructor(private fb: FormBuilder, private doctorService: DoctorService) {
    this.doctorForm = this.fb.group({
      id: [''],
      name: [''],
      specialization: [''],
      location: [''],
      experience: [''],
      rating: ['']
    });
  }

  onSubmit() {
    this.doctorService.addDoctor(this.doctorForm.value).subscribe(response => {
      alert('Doctor added successfully!');
    });
  }
}
