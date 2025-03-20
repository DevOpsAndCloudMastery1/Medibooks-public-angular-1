import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-appointment-management',
    standalone: true,
    imports: [FormsModule, CommonModule], // Import FormsModule and CommonModule
    templateUrl: './appointment-management.component.html',
    styleUrl: './appointment-management.component.css'
})
export class AppointmentManagementComponent implements OnInit {
    activeBookings: { doctor: string; date: string; time: string; status: string }[] = [];
    pastBookings: { doctor: string; date: string; status: string }[] = [];
    selectedDoctor: string = '';
    patientName: string = '';
    email: string = '';
    appointmentDate: string = '';

    ngOnInit(): void {
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

        const newBooking = {
            doctor: this.selectedDoctor,
            date: this.appointmentDate,
            time: 'TBD',
            status: 'Confirmed'
        };

        this.activeBookings.push(newBooking);
        this.saveBookings();
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
        const storedActive = localStorage.getItem('activeBookings');
        const storedPast = localStorage.getItem('pastBookings');

        this.activeBookings = storedActive ? JSON.parse(storedActive) : [];
        this.pastBookings = storedPast ? JSON.parse(storedPast) : [];
    }

    saveBookings(): void {
        localStorage.setItem('activeBookings', JSON.stringify(this.activeBookings));
        localStorage.setItem('pastBookings', JSON.stringify(this.pastBookings)); // Keep it consistent
    }

    reschedule(index: number): void {
        const newDate = prompt('Enter a new date (YYYY-MM-DD):');
        if (newDate) {
            this.activeBookings[index].date = newDate;
            this.saveBookings();
            alert('Appointment rescheduled successfully!');
            this.loadBookings();
        }
    }

    cancel(index: number): void {
        if (confirm('Are you sure you want to cancel this appointment?')) {
            // Move to past bookings
            const canceledBooking = this.activeBookings.splice(index, 1)[0]; //remove form active booking
            canceledBooking.status = 'Canceled';//update status to cancel
            this.pastBookings.push(canceledBooking); //add cancel booking to the past booking

            this.saveBookings();
            alert('Appointment canceled successfully!');
            this.loadBookings();
        }
    }

    markAsCompleted(index: number): void {
        const completedBooking = this.activeBookings.splice(index, 1)[0]; // Remove from active
        completedBooking.status = 'Completed';  // Update status
        this.pastBookings.push(completedBooking); // Add to past
        this.saveBookings();
        this.loadBookings();
    }
}