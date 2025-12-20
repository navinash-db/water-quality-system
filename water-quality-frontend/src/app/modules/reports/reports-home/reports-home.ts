import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
export class ReportsHome {

  dailyDate = '';
  monthlyMonth = '';

  dailyReport: any;
  monthlyReport: any;

  constructor(private reportService: ReportService) {}

  loadDaily() {
    this.reportService.getDaily(this.dailyDate).subscribe(res => {
      this.dailyReport = res;
    });
  }

  loadMonthly() {
    this.reportService.getMonthly(this.monthlyMonth).subscribe(res => {
      this.monthlyReport = res;
    });
  }

  exportDaily() {
    this.reportService.exportDaily(this.dailyDate).subscribe(csv => {
      this.download(csv, 'daily-report.csv');
    });
  }

  exportMonthly() {
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
