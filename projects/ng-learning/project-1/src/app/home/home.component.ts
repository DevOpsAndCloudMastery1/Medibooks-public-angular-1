import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  features = [
    { title: 'Search for Doctors', description: 'Explore our list of doctors.', link: '/doctor-search' },
    { title: 'Manage Your Profile', description: 'Edit personal info.', link: '/user-profile' },
    { title: 'Book an Appointment', description: 'Schedule appointments.', link: '/appointment-booking' }
    { title: 'Manage Appointments', description: 'View, reschedule, or cancel your appointments easily.', link: '/appointment-management' },
    { title: 'Doctor Reviews', description: 'Read and share reviews about doctors to help others make informed choices.', link: '/doctor-reviews' },
    { title: 'Placeholder Feature', description: 'This is a placeholder for future functionality.', link: '#' }
  ];

}
