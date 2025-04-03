import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-manage-appointments',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], // ✅ Required modules
  templateUrl: './manage-appointments.component.html',
  styleUrls: ['./manage-appointments.component.css']
})
export class ManageAppointmentsComponent {
  doctorFilter: string = 'All';
  statusFilter: string = 'All';
  selectedRow: any = null;
  showModal: boolean = false;
  modalOverlay: boolean = false;
  newDate: string = '';
  newTime: string = '';

  appointments = [
    { patient: 'John Doe', doctor: 'Dr. John Smith', date: '2025-02-20', status: 'Pending' },
    { patient: 'Jane Smith', doctor: 'Dr. Emma Davis', date: '2025-02-22', status: 'Approved' }
  ];

  filterAppointments() {
    return this.appointments.filter(app => 
      (this.doctorFilter === 'All' || app.doctor === this.doctorFilter) &&
      (this.statusFilter === 'All' || app.status === this.statusFilter)
    );
  }

  approveAppointment(appointment: any) {
    appointment.status = 'Approved';
  }

  cancelAppointment(appointment: any) {
    appointment.status = 'Cancelled';
  }

  openRescheduleModal(appointment: any) {
    this.selectedRow = appointment;
    this.showModal = true;
    this.modalOverlay = true;
  }

  confirmReschedule() {
    if (this.selectedRow && this.newDate && this.newTime) {
      this.selectedRow.status = `Rescheduled to ${this.newDate} ${this.newTime}`;
      this.showModal = false;
      this.modalOverlay = false;
    } else {
      alert('Please select both a new date and time.');
    }
  }

  closeModal() {
    this.showModal = false;
    this.modalOverlay = false;
  }
}
