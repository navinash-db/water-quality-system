import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, ChangeDetectorRef } from '@angular/core'; // <--- 1. Import ChangeDetectorRef
import { Chart } from 'chart.js/auto';
import { DashboardService } from '../../../core/services/dashboard.service';
import { Navbar } from '../../../shared/navbar/navbar';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [CommonModule, Navbar],
  templateUrl: './dashboard-home.html',
  styleUrl: './dashboard-home.css'
})
export class DashboardHome implements AfterViewInit, OnDestroy {

  latestReading: any = null;
  
  qualityChart: any;
  trendChart: any;

  constructor(
    private dashboardService: DashboardService,
    private cdr: ChangeDetectorRef // <--- 2. Inject it here
  ) {}

  ngAfterViewInit(): void {
    // 1. Get Summary
    this.dashboardService.getSummary().subscribe(summary => {
      this.createSummaryChart(summary);
    });

    // 2. Get Trends
    this.dashboardService.getTrends().subscribe(trends => {
      this.createTrendChart(trends);
    });

    // 3. Get Latest Reading
    this.dashboardService.getLatest().subscribe(reading => {
      this.latestReading = reading;
      
      // <--- 3. FIX: Force the screen to update immediately
      this.cdr.detectChanges(); 
    });
  }

  ngOnDestroy(): void {
    if (this.qualityChart) this.qualityChart.destroy();
    if (this.trendChart) this.trendChart.destroy();
  }

  createSummaryChart(summary: any) {
    if (this.qualityChart) this.qualityChart.destroy();

    this.qualityChart = new Chart('qualityChart', {
      type: 'doughnut',
      data: {
        labels: ['Good', 'Moderate', 'Poor'],
        datasets: [{
          data: [summary.good, summary.moderate, summary.poor],
          backgroundColor: ['#22c55e', '#f59e0b', '#ef4444'],
          borderWidth: 0,
          hoverOffset: 4
        }]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: { legend: { position: 'bottom' } }
      }
    });
  }

  createTrendChart(trends: any[]) {
    if (this.trendChart) this.trendChart.destroy();

    const dates = trends.map(t => t.date);
    const poor = trends.map(t => t.poor);

    this.trendChart = new Chart('trendChart', {
      type: 'line',
      data: {
        labels: dates,
        datasets: [{
          label: 'Critical Incidents',
          data: poor,
          borderColor: '#ef4444',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          y: { beginAtZero: true, ticks: { stepSize: 1 } }
        }
      }
    });
  }
}