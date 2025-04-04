import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';  // Import RouterModule for navigation

@Component({
  selector: 'app-manage-doctors',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './manage-doctors.component.html',
  styleUrls: ['./manage-doctors.component.css']
})
export class ManageDoctorsComponent {
  // Initial doctors data
  doctors = [
    { name: "Dr. John Smith", specialization: "Cardiologist", experience: "10 years", availability: "Available", photo: "images/doctor1.jpg" },
    { name: "Dr. Emma Davis", specialization: "Neurologist", experience: "12 years", availability: "Not Available", photo: "images/doctor2.jpg" },
    { name: "Dr. Michael Brown", specialization: "Pediatrician", experience: "8 years", availability: "Available", photo: "images/doctor3.jpg" },
    { name: "Dr. Olivia Wilson", specialization: "Orthopedic Surgeon", experience: "15 years", availability: "Available", photo: "images/doctor4.jpg" },
    { name: "Dr. Liam Johnson", specialization: "Dermatologist", experience: "7 years", availability: "Not Available", photo: "images/doctor5.jpg" },
    { name: "Dr. Sophia Martinez", specialization: "Gynecologist", experience: "9 years", availability: "Available", photo: "images/doctor6.jpg" }
  ];

  // Form data
  doctorName: string = '';
  specialization: string = '';
  experience: string = '';
  availability: string = 'Available';
  photo: File | null = null;

  constructor(private router: Router) {}

  onFileSelected(event: Event): void {
    console.log('onFileSelected event triggered');
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;

    if (fileList && fileList.length > 0) {
      this.photo = fileList[0]; // Assign the selected File object to the component property
      console.log('File selected:', this.photo); // For debugging
    } else {
      this.photo = null;
      console.log('No file selected or file list empty');
    }
  }

  // Function to add a doctor
  addDoctor(event: Event) {
    console.log('addDoctor function called'); 
    event.preventDefault(); // Prevent form submission

    if (this.doctorName && this.specialization && this.experience && this.availability && this.photo) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.doctors.push({
          name: this.doctorName,
          specialization: this.specialization,
          experience: this.experience,
          availability: this.availability,
          photo: e.target?.result as string
        });
        this.resetForm();
        alert("Doctor added successfully!");
      };
      reader.readAsDataURL(this.photo);
    } else {
      alert("Please fill out all fields");
    }
  }

  // Reset form after adding a doctor
  resetForm() {
    this.doctorName = '';
    this.specialization = '';
    this.experience = '';
    this.availability = 'Available';
    this.photo = null;
  }

  // Function to edit doctor
  editDoctor(index: number) {
    const doctor = this.doctors[index];

    // Prompt for all the details
    const newName = prompt("Edit Doctor Name:", doctor.name);
    const newSpecialization = prompt("Edit Specialization:", doctor.specialization);
    const newExperience = prompt("Edit Experience:", doctor.experience);
    const newAvailability = prompt("Edit Availability (Available/Not Available):", doctor.availability);

    if (newName && newSpecialization && newExperience && newAvailability) {
      doctor.name = newName;
      doctor.specialization = newSpecialization;
      doctor.experience = newExperience;
      doctor.availability = newAvailability;
    } else {
      alert("All fields must be filled out to edit the doctor.");
    }
  }

  // Function to delete doctor
  deleteDoctor(index: number) {
    if (confirm("Are you sure you want to delete this doctor?")) {
      this.doctors.splice(index, 1);
    }
  }
}
