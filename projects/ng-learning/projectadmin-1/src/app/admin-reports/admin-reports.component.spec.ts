import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminReportsComponent } from './admin-reports.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { saveAs } from 'file-saver';
import * as ExcelJS from 'exceljs';

// --- Mocking External Dependencies ---
jest.mock('file-saver', () => ({
  saveAs: jest.fn(),
}));

jest.mock('exceljs', () => ({
  Workbook: jest.fn().mockImplementation(() => ({
    addWorksheet: jest.fn().mockReturnValue({
      columns: [],
      addRow: jest.fn(),
      getRow: jest.fn().mockReturnValue({ // Mock getRow for header styling
        font: {},
        alignment: {},
        fill: {},
        border: {},
      }),
    }),
    xlsx: {
      writeBuffer: jest.fn().mockResolvedValue(new ArrayBuffer(8)), // Mock resolved buffer
    },
  })),
}));

// --- Test Suite ---
describe('AdminReportsComponent', () => {
  let component: AdminReportsComponent;
  let fixture: ComponentFixture<AdminReportsComponent>;
  let saveAsMock: jest.Mock;
  // Removed unused mockExcelJSWorkbook variable declaration

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AdminReportsComponent, // Standalone component import
        NoopAnimationsModule,  // For animations if any
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminReportsComponent);
    component = fixture.componentInstance;

    // Reset mocks before each test
    saveAsMock = saveAs as jest.Mock;
    saveAsMock.mockClear();

    const WorkbookMock = ExcelJS.Workbook as jest.Mock;
    WorkbookMock.mockClear();

    // Initial change detection to trigger ngOnInit, ngAfterViewInit, and initial render
    fixture.detectChanges();
  });

  // --- Test Cases ---
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default overview data on ngOnInit', () => {
    expect(component.totalAppointments).toBe(120);
    expect(component.activeUsers).toBe(350);
    expect(component.activeDoctors).toBe(45);
  });

  it('should call applyFilters on ngOnInit and initialize filteredDoctorReports', () => {
    // ngOnInit triggers applyFilters, populating the filtered list initially
    expect(component.filteredDoctorReports).toEqual(component.allDoctorReports);
    expect(component.filteredDoctorReports.length).toBe(component.allDoctorReports.length);
  });

  it('should filter reports by selected doctor when applyFilters is called', () => {
    component.selectedDoctor = 'Dr. Emma Davis'; // Set filter
    component.applyFilters(); // Apply filter logic
    // No need for detectChanges here as we are checking component state, not the DOM
    expect(component.filteredDoctorReports.length).toBe(1);
    expect(component.filteredDoctorReports[0].doctor).toBe('Dr. Emma Davis');
  });

  it('should filter reports by selected specialization when applyFilters is called', () => {
    component.selectedSpecialization = 'Cardiology'; // Set filter
    component.applyFilters(); // Apply filter logic
    expect(component.filteredDoctorReports.length).toBe(1);
    expect(component.filteredDoctorReports[0].specialization).toBe('Cardiology');
  });

  it('should filter reports by date range when applyFilters is called', () => {
    component.startDate = '2025-01-02'; // Set start date
    component.endDate = '2025-01-04'; // Set end date
    component.applyFilters(); // Apply filter logic
    expect(component.filteredDoctorReports.length).toBe(3); // Expecting 3 reports in this range
    expect(component.filteredDoctorReports.map(r => r.date)).toEqual([
      '2025-01-02', '2025-01-03', '2025-01-04'
    ]);
  });

  it('should call saveAs with correct arguments when exporting to CSV', () => {
    component.applyFilters(); // Ensure data exists
    component.exportToCsv(); // Trigger export
    expect(saveAsMock).toHaveBeenCalledTimes(1); // Check mock call count
    expect(saveAsMock).toHaveBeenCalledWith(expect.any(Blob), 'doctor_report.csv'); // Check arguments
    const blobArg = saveAsMock.mock.calls[0][0] as Blob;
    expect(blobArg.type).toBe('text/csv;charset=utf-8;'); // Check blob type
  });

  it('should call ExcelJS methods and saveAs with correct arguments when exporting to Excel', async () => {
    component.applyFilters(); // Ensure data exists
    const WorkbookMock = ExcelJS.Workbook as jest.Mock; // Get reference to mock constructor
    await component.exportToExcel(); // Trigger async export
    expect(WorkbookMock).toHaveBeenCalledTimes(1); // Check Workbook constructor call
    expect(saveAsMock).toHaveBeenCalledTimes(1); // Check saveAs call count
    expect(saveAsMock).toHaveBeenCalledWith(expect.any(Blob), 'doctor_report.xlsx'); // Check arguments
    const blobArg = saveAsMock.mock.calls[0][0] as Blob;
    expect(blobArg.type).toBe('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'); // Check blob type
  });

  it('should handle Excel export error gracefully', async () => {
    const errorMsg = 'Excel export failed';
    const WorkbookMock = ExcelJS.Workbook as jest.Mock;
    // Override mock implementation specifically for this test to force an error
    WorkbookMock.mockImplementation(() => ({
      addWorksheet: jest.fn().mockReturnValue({
        columns: [], addRow: jest.fn(), getRow: jest.fn().mockReturnValue({ font: {}, alignment: {}, fill: {}, border: {} }),
      }),
      xlsx: {
        writeBuffer: jest.fn().mockRejectedValue(new Error(errorMsg)), // Force rejection
      },
    }));

    // Spy on console and alert to check if they are called on error
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation();

    await component.exportToExcel(); // Trigger export

    // Assertions for error handling
    expect(saveAsMock).not.toHaveBeenCalled(); // saveAs should not be called on error
    expect(consoleErrorSpy).toHaveBeenCalledWith("Error during Excel export:", expect.any(Error)); // Check console log
    expect(alertSpy).toHaveBeenCalledWith('An error occurred while exporting to Excel. Please check the console for details.'); // Check alert

    // Restore spies to avoid affecting other tests
    consoleErrorSpy.mockRestore();
    alertSpy.mockRestore();
  });

  it('should disable export buttons when there is no filtered data', () => {
    component.filteredDoctorReports = []; // Set state to empty data
    fixture.detectChanges(); // Apply state change to the DOM

    // Query buttons AFTER detectChanges
    const csvButton: HTMLButtonElement | null = fixture.nativeElement.querySelector('button.btn-success:nth-of-type(1)');
    const excelButton: HTMLButtonElement | null = fixture.nativeElement.querySelector('button.btn-success:nth-of-type(2)');

    // Assert buttons are found and disabled
    expect(csvButton).toBeTruthy(); // Check if element exists
    expect(excelButton).toBeTruthy(); // Check if element exists
    if (csvButton) expect(csvButton.disabled).toBe(true); // Check disabled property
    if (excelButton) expect(excelButton.disabled).toBe(true); // Check disabled property

    component.filteredDoctorReports = [component.allDoctorReports[0]]; // Set state with some data
    fixture.detectChanges(); // Apply state change to the DOM

    if (csvButton) expect(csvButton.disabled).toBe(false);
    if (excelButton) expect(excelButton.disabled).toBe(false);
  });

  // Test for the getYear method
  it('should return the current year from getYear()', () => {
    const currentYear = new Date().getFullYear();
    expect(component.getYear()).toBe(currentYear);
  });

});