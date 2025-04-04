import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminReportsComponent } from './admin-reports.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { saveAs } from 'file-saver';  // Import saveAs
import * as ExcelJS from 'exceljs';  // Import ExcelJS

// Mock file-saver
jest.mock('file-saver', () => ({
  saveAs: jest.fn(),
}));

// Mock ExcelJS
jest.mock('exceljs', () => ({
  Workbook: jest.fn().mockImplementation(() => ({
    addWorksheet: jest.fn().mockReturnValue({
      columns: [],
      addRow: jest.fn(),
    }),
    xlsx: {
      writeBuffer: jest.fn().mockResolvedValue(new ArrayBuffer(8)),  // Mock resolved buffer
    },
  })),
}));

describe('AdminReportsComponent', () => {
  let component: AdminReportsComponent;
  let fixture: ComponentFixture<AdminReportsComponent>;
  let saveAsMock: jest.Mock;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AdminReportsComponent,  // Directly import the standalone component
        NoopAnimationsModule,   // If animations are needed
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminReportsComponent);
    component = fixture.componentInstance;
    saveAsMock = saveAs as jest.Mock;  // Cast saveAs to jest mock
    saveAsMock.mockClear();  // Clear previous mock calls before each test
    fixture.detectChanges();  // Trigger change detection
  });

  it('should create', () => {
    expect(component).toBeTruthy();  // Component should be created
  });

  it('should initialize with default overview data', () => {
    expect(component.totalAppointments).toBe(120);  // Default value check
    expect(component.activeUsers).toBe(350);        // Default value check
    expect(component.activeDoctors).toBe(45);       // Default value check
  });

  it('should initialize filteredDoctorReports with all reports', () => {
    // Ensure that all doctor reports are available after initialization
    expect(component.filteredDoctorReports.length).toBe(component.allDoctorReports.length);
  });

  it('should filter reports by doctor', () => {
    // Set a doctor filter and apply filters
    component.selectedDoctor = 'Dr. Emma Davis';
    component.applyFilters();

    // Assert the filter logic
    expect(component.filteredDoctorReports.length).toBe(1);
    expect(component.filteredDoctorReports[0].doctor).toBe('Dr. Emma Davis');
  });

  it('should call saveAs when exporting to CSV', () => {
    component.exportToCsv();  // Call the method to export CSV

    // Assert saveAs is called once and with correct file
    expect(saveAsMock).toHaveBeenCalledTimes(1);
    expect(saveAsMock).toHaveBeenCalledWith(expect.any(Blob), 'doctor_report.csv');
  });

  it('should call saveAs with excel data when exporting to Excel', async () => {
    await component.exportToExcel();  // Await the async export

    // Ensure saveAs is called once and with the correct file
    expect(saveAsMock).toHaveBeenCalledTimes(1);
    expect(saveAsMock).toHaveBeenCalledWith(expect.any(Blob), 'doctor_report.xlsx');

    // Optional: Verify the blob type if needed (excel MIME type)
    const blobArg = saveAsMock.mock.calls[0][0] as Blob;
    expect(blobArg.type).toBe('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  });
});
