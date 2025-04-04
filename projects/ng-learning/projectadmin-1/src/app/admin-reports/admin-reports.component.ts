import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { Chart, registerables } from 'chart.js/auto';
import { saveAs } from 'file-saver';
import * as ExcelJS from 'exceljs';

Chart.register(...registerables);

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
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './admin-reports.component.html',
  styleUrls: ['./admin-reports.component.css']
})
export class AdminReportsComponent implements OnInit, AfterViewInit, OnDestroy {

  startDate: string = '';
  endDate: string = '';
  selectedDoctor: string = '';
  selectedSpecialization: string = '';
  totalAppointments: number = 0;
  activeUsers: number = 0;
  activeDoctors: number = 0;
  allDoctorReports: DoctorReport[] = [
    { date: '2025-01-01', doctor: 'Dr. John Smith', specialization: 'Cardiology', appointments: 20 },
    { date: '2025-01-02', doctor: 'Dr. Emma Davis', specialization: 'Neurology', appointments: 15 },
    { date: '2025-01-03', doctor: 'Dr. Michael Brown', specialization: 'Pediatrics', appointments: 25 },
    { date: '2025-01-04', doctor: 'Dr. Olivia Wilson', specialization: 'Orthopedics', appointments: 10 },
    { date: '2025-01-05', doctor: 'Dr. Liam Johnson', specialization: 'Dermatology', appointments: 18 },
    { date: '2025-01-06', doctor: 'Dr. Sophia Martinez', specialization: 'Gynecology', appointments: 22 }
  ];
  filteredDoctorReports: DoctorReport[] = [];
  @ViewChild('appointmentsChartCanvas') appointmentsChartCanvas!: ElementRef<HTMLCanvasElement>;
  appointmentsChart: Chart | null = null;

  constructor() {}

  ngOnInit(): void {
    this.totalAppointments = 120;
    this.activeUsers = 350;
    this.activeDoctors = 45;
    this.applyFilters();
  }

  ngAfterViewInit(): void {
    this.renderAppointmentsChart();
  }

  ngOnDestroy(): void {
    this.appointmentsChart?.destroy();
  }

  applyFilters(): void {
    this.filteredDoctorReports = this.allDoctorReports.filter(report => {
      const reportDate = new Date(report.date);
      const filterStartDate = this.startDate ? new Date(this.startDate) : null;
      const filterEndDate = this.endDate ? new Date(this.endDate) : null;
       if (filterEndDate) {
          filterEndDate.setHours(23, 59, 59, 999);
      }

      const isWithinDate =
        (!filterStartDate || reportDate >= filterStartDate) &&
        (!filterEndDate || reportDate <= filterEndDate);

      const isDoctorMatch = !this.selectedDoctor || report.doctor === this.selectedDoctor;
      const isSpecializationMatch = !this.selectedSpecialization || report.specialization === this.selectedSpecialization;

      return isWithinDate && isDoctorMatch && isSpecializationMatch;
    });
  }

  renderAppointmentsChart(): void {
     if (this.appointmentsChart) {
      this.appointmentsChart.destroy();
      this.appointmentsChart = null;
    }
    if (this.appointmentsChartCanvas?.nativeElement) {
      const ctx = this.appointmentsChartCanvas.nativeElement.getContext('2d');
      if (ctx) {
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
                  tension: 0.1,
                  fill: true
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
      } else { console.error('Failed to get 2D context'); }
    } else { console.error('Canvas element not found.'); }
  }

  exportToCsv(): void {
     if (this.filteredDoctorReports.length === 0) {
      alert('No data to export.');
      return;
    }
    const header = ['Date', 'Doctor', 'Specialization', 'Appointments'];
    const rows = this.filteredDoctorReports.map(report =>
      [
        report.date,
        `"${report.doctor.replace(/"/g, '""')}"`,
        report.specialization,
        report.appointments
      ]
    );
    const csvContent = [ header.join(','), ...rows.map(row => row.join(',')) ].join('\n');
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'doctor_report.csv');
  }

  async exportToExcel(): Promise<void> {
     if (this.filteredDoctorReports.length === 0) {
      alert('No data to export.');
      return;
    }
    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Doctor Report');

      worksheet.columns = [
        { header: 'Date', key: 'date', width: 15 },
        { header: 'Doctor', key: 'doctor', width: 35 },
        { header: 'Specialization', key: 'specialization', width: 20 },
        { header: 'Appointments', key: 'appointments', width: 15, style: { numFmt: '0', alignment: { horizontal: 'right' } } }
      ];

       worksheet.getRow(1).font = { bold: true };
       worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };
       worksheet.getRow(1).fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFD3D3D3' }
        };
        worksheet.getRow(1).border = {
          bottom: { style: 'thin' }
        };

      this.filteredDoctorReports.forEach(report => {
        worksheet.addRow({
            date: report.date,
            doctor: report.doctor,
            specialization: report.specialization,
            appointments: report.appointments
        });
      });

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, 'doctor_report.xlsx');
    } catch (error) {
      console.error("Error during Excel export:", error);
      alert('An error occurred while exporting to Excel. Please check the console for details.');
    }
  }

  getYear(): number {
    return new Date().getFullYear();
  }
}