import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReportService } from '../../../core/services/report.service';
import { Navbar } from '../../../shared/navbar/navbar';

@Component({
  selector: 'app-reports-home',
  standalone: true,
  imports: [CommonModule, FormsModule, Navbar],
  templateUrl: './reports-home.html',
  styleUrl: './reports-home.css'
})
export class ReportsHome implements OnInit {

  dailyDate = '';
  monthlyMonth = '';

  dailyReport: any;
  monthlyReport: any;

  constructor(private reportService: ReportService) {}

  ngOnInit() {
    // 1. Set Default Date to TODAY (Fixes the "Click Twice" / Empty Error)
    const today = new Date();
    this.dailyDate = today.toISOString().split('T')[0]; // yyyy-mm-dd
    this.monthlyMonth = today.toISOString().slice(0, 7); // yyyy-mm
  }

  loadDaily() {
    if (!this.dailyDate) return; // Prevent empty request
    this.reportService.getDaily(this.dailyDate).subscribe(res => {
      this.dailyReport = res;
    });
  }

  loadMonthly() {
    if (!this.monthlyMonth) return; // Prevent empty request
    this.reportService.getMonthly(this.monthlyMonth).subscribe(res => {
      this.monthlyReport = res;
    });
  }

  exportDaily() {
    if (!this.dailyDate) return;
    this.reportService.exportDaily(this.dailyDate).subscribe(csv => {
      this.download(csv, 'daily-report.csv');
    });
  }

  exportMonthly() {
    if (!this.monthlyMonth) return;
    this.reportService.exportMonthly(this.monthlyMonth).subscribe(csv => {
      this.download(csv, 'monthly-report.csv');
    });
  }

  download(content: string, fileName: string) {
    const blob = new Blob([content], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}