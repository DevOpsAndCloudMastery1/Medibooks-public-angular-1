import { Component } from '@angular/core';

@Component({
  selector: 'app-appointment-management',
  standalone: true,
  templateUrl: './appointment-management.component.html',
  styleUrl: './appointment-management.component.css'
})
export class AppointmentManagementComponent {
  activeBookings: { doctor: string; date: string; time: string; status: string }[] = [];
  pastBookings: { doctor: string; date: string; status: string }[] = [];
  selectedDoctor: string = '';
  patientName: string = '';
  email: string = '';
  appointmentDate: string = '';

  constructor() {
    this.loadBookings();
  }

  selectDoctor(doctorName: string): void {
    this.selectedDoctor = doctorName;
  }

  bookAppointment(): void {
    if (!this.selectedDoctor || !this.patientName || !this.email || !this.appointmentDate) {
      alert('Please fill in all fields');
      return;
    }
    this.activeBookings.push({
      doctor: this.selectedDoctor,
      date: this.appointmentDate,
      time: 'TBD',
      status: 'Confirmed'
    });
    localStorage.setItem('activeBookings', JSON.stringify(this.activeBookings));
    alert('Appointment booked successfully!');
    this.resetForm();
    this.loadBookings();
  }

  resetForm(): void {
    this.selectedDoctor = '';
    this.patientName = '';
    this.email = '';
    this.appointmentDate = '';
  }

  loadBookings(): void {
    const storedActive = JSON.parse(localStorage.getItem('activeBookings') || '[]');
    const storedPast = JSON.parse(localStorage.getItem('pastBookings') || '[]');
    this.activeBookings = storedActive;
    this.pastBookings = storedPast;
  }

  reschedule(index: number): void {
    const newDate = prompt('Enter a new date (YYYY-MM-DD):');
    if (newDate) {
      this.activeBookings[index].date = newDate;
      localStorage.setItem('activeBookings', JSON.stringify(this.activeBookings));
      alert('Appointment rescheduled successfully!');
      this.loadBookings();
    }
  }

  cancel(index: number): void {
    if (confirm('Are you sure you want to cancel this appointment?')) {
      this.activeBookings.splice(index, 1);
      localStorage.setItem('activeBookings', JSON.stringify(this.activeBookings));
      alert('Appointment canceled successfully!');
      this.loadBookings();
    }
  }
}
