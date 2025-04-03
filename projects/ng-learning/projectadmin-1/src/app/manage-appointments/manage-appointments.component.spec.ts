import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageAppointmentsComponent } from './manage-appointments.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

describe('ManageAppointmentsComponent', () => {
  let component: ManageAppointmentsComponent;
  let fixture: ComponentFixture<ManageAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageAppointmentsComponent, FormsModule, RouterModule, CommonModule] // ✅ Added missing RouterModule & CommonModule
    }).compileComponents();

    fixture = TestBed.createComponent(ManageAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should approve an appointment', () => {
    component.approveAppointment(component.appointments[0]);
    expect(component.appointments[0].status).toBe('Approved');
  });

  it('should cancel an appointment', () => {
    component.cancelAppointment(component.appointments[0]);
    expect(component.appointments[0].status).toBe('Cancelled');
  });

  it('should filter appointments correctly', () => {
    component.doctorFilter = 'Dr. John Smith';
    component.statusFilter = 'Pending';
    const filtered = component.filterAppointments();
    expect(filtered.length).toBe(1);
    expect(filtered[0].patient).toBe('John Doe');
  });

  it('should open reschedule modal', () => {
    component.openRescheduleModal(component.appointments[0]);
    expect(component.showModal).toBeTrue();
    expect(component.modalOverlay).toBeTrue();
    expect(component.selectedRow).toEqual(component.appointments[0]);
  });

  it('should confirm reschedule when valid data is provided', () => {
    component.openRescheduleModal(component.appointments[0]);
    component.newDate = '2025-03-01';
    component.newTime = '10:00 AM';
    component.confirmReschedule();
    expect(component.selectedRow.status).toBe('Rescheduled to 2025-03-01 10:00 AM');
    expect(component.showModal).toBeFalse();
    expect(component.modalOverlay).toBeFalse();
  });

  it('should not confirm reschedule when date or time is missing', () => {
    spyOn(window, 'alert');
    component.openRescheduleModal(component.appointments[0]);
    component.newDate = '';
    component.newTime = '';
    component.confirmReschedule();
    expect(window.alert).toHaveBeenCalledWith('Please select both a new date and time.');
  });
});
