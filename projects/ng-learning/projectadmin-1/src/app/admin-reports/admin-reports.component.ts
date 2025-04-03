import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Needed for ngModel
import { RouterModule } from '@angular/router'; // Good practice if linking later

// Import necessary libraries
import { Chart, registerables } from 'chart.js/auto'; // Use /auto for convenience
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

// Interface for better type safety (optional but recommended)
interface DoctorReport {
  date: string;
  doctor: string;
  specialization: string;
  appointments: number;
}

@Component({
  selector: 'app-admin-reports',
  standalone: true,
  imports: [
    CommonModule, // For *ngFor, *ngIf etc.
    FormsModule,  // For [(ngModel)]
    RouterModule  // For potential future routerLink usage
  ],
  templateUrl: './admin-reports.component.html',
  styleUrls: ['./admin-reports.component.css']
})
export class AdminReportsComponent implements OnInit, AfterViewInit, OnDestroy {

  // --- State Properties ---

  // Filters
  startDate: string = '';
  endDate: string = '';
  selectedDoctor: string = '';
  selectedSpecialization: string = '';

  // Overview Cards Data
  totalAppointments: number = 0; // Initialize
  activeUsers: number = 0;
  activeDoctors: number = 0;

  // Doctor Report Table Data
  allDoctorReports: DoctorReport[] = [ // Mock data from original script
    { date: '2025-01-01', doctor: 'Dr. John Smith', specialization: 'Cardiology', appointments: 20 },
    { date: '2025-01-02', doctor: 'Dr. Emma Davis', specialization: 'Neurology', appointments: 15 },
    { date: '2025-01-03', doctor: 'Dr. Michael Brown', specialization: 'Pediatrics', appointments: 25 },
    { date: '2025-01-04', doctor: 'Dr. Olivia Wilson', specialization: 'Orthopedics', appointments: 10 },
    { date: '2025-01-05', doctor: 'Dr. Liam Johnson', specialization: 'Dermatology', appointments: 18 },
    { date: '2025-01-06', doctor: 'Dr. Sophia Martinez', specialization: 'Gynecology', appointments: 22 }
  ];
  filteredDoctorReports: DoctorReport[] = [];

  // Chart specific
  @ViewChild('appointmentsChartCanvas') appointmentsChartCanvas!: ElementRef<HTMLCanvasElement>;
  appointmentsChart: Chart | null = null;

  // --- Lifecycle Hooks ---

  constructor() {
    // Register Chart.js components needed (if not using /auto)
    // Chart.register(...registerables); // Usually needed if importing specific chart types
  }

  ngOnInit(): void {
    // Load initial data (replace with actual API calls later)
    this.totalAppointments = 120;
    this.activeUsers = 350;
    this.activeDoctors = 45;

    // Apply initial filter (show all reports initially)
    this.applyFilters();
  }

  ngAfterViewInit(): void {
    // Render chart after the view and canvas element are available
    this.renderAppointmentsChart();
  }

  ngOnDestroy(): void {
    // Clean up the chart instance when the component is destroyed
    this.appointmentsChart?.destroy();
  }

  // --- Component Methods ---

  applyFilters(): void {
    this.filteredDoctorReports = this.allDoctorReports.filter(report => {
      const reportDate = new Date(report.date);
      const filterStartDate = this.startDate ? new Date(this.startDate) : null;
      const filterEndDate = this.endDate ? new Date(this.endDate) : null;

      const isWithinDate =
        (!filterStartDate || reportDate >= filterStartDate) &&
        (!filterEndDate || reportDate <= filterEndDate);

      const isDoctorMatch = !this.selectedDoctor || report.doctor === this.selectedDoctor;
      const isSpecializationMatch = !this.selectedSpecialization || report.specialization === this.selectedSpecialization;

      return isWithinDate && isDoctorMatch && isSpecializationMatch;
    });

    // Optional: Update chart data based on filters if needed
    // this.updateChartData(this.filteredDoctorReports);
  }

  renderAppointmentsChart(): void {
    if (this.appointmentsChart) {
      this.appointmentsChart.destroy(); // Destroy previous chart if re-rendering
    }

    if (this.appointmentsChartCanvas) {
      const ctx = this.appointmentsChartCanvas.nativeElement.getContext('2d');
      if (ctx) {
        // Mock chart data (replace with dynamic data later)
        const chartLabels = ['January', 'February', 'March', 'April', 'May', 'June'];
        const chartDataPoints = [10, 20, 30, 40, 50, 60];

        this.appointmentsChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: chartLabels,
            datasets: [{
              label: 'Appointments Over Time',
              data: chartDataPoints,
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
              tension: 0.1 // Makes the line slightly curved
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: true },
              tooltip: { enabled: true }
            },
            scales: {
              x: {
                title: { display: true, text: 'Months' }
              },
              y: {
                title: { display: true, text: 'Number of Appointments' },
                beginAtZero: true
              }
            }
          }
        });
      } else {
        console.error('Failed to get 2D context for appointments chart canvas.');
      }
    } else {
      console.error('Appointments chart canvas element not found.');
    }
  }

  exportToCsv(): void {
    // Use filtered data for export
    const header = ['Date', 'Doctor', 'Specialization', 'Appointments'];
    const rows = this.filteredDoctorReports.map(report =>
      [report.date, report.doctor, report.specialization, report.appointments]
    );

    const csvContent = [
      header.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'doctor_report.csv');
  }

  exportToExcel(): void {
     // Use filtered data for export
    const header = ["Date", "Doctor", "Specialization", "Appointments"];
    const data = this.filteredDoctorReports.map(report => [
        report.date,
        report.doctor,
        report.specialization,
        report.appointments
    ]);

    // Create worksheet
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([header, ...data]);

    // Create workbook and add the worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Doctor Report'); // Sheet name

    // Generate Excel file and trigger download
    XLSX.writeFile(wb, 'doctor_report.xlsx');
  }
}