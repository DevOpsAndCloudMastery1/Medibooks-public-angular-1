import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'; // Often useful for testing components with animations or Material components

import { AdminReportsComponent } from './admin-reports.component';


describe('AdminReportsComponent', () => {
  let component: AdminReportsComponent;
  let fixture: ComponentFixture<AdminReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Import the standalone component directly
      imports: [
        AdminReportsComponent,
        CommonModule, 
        FormsModule,  
        NoopAnimationsModule 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Triggers ngOnInit
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default overview data', () => {
    expect(component.totalAppointments).toBe(120);
    expect(component.activeUsers).toBe(350);
    expect(component.activeDoctors).toBe(45);
  });

  it('should initialize filteredDoctorReports with all reports', () => {
    expect(component.filteredDoctorReports.length).toBe(component.allDoctorReports.length);
  });

  // Add more tests for filtering, exporting, chart rendering (might need spies/mocks)
  it('should filter reports by doctor', () => {
    component.selectedDoctor = 'Dr. Emma Davis';
    component.applyFilters();
    expect(component.filteredDoctorReports.length).toBe(1);
    expect(component.filteredDoctorReports[0].doctor).toBe('Dr. Emma Davis');
  });

});