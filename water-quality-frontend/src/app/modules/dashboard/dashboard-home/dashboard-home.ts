import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
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
export class DashboardHome implements AfterViewInit {

  constructor(private dashboardService: DashboardService) {}

  ngAfterViewInit(): void {
    // Quality summary bar chart
    this.dashboardService.getSummary().subscribe(summary => {
      this.createSummaryChart(summary);
    });

    // Trend line chart
    this.dashboardService.getTrends().subscribe(trends => {
      this.createTrendChart(trends);
    });
  }

  createSummaryChart(summary: any) {
    new Chart('qualityChart', {
      type: 'bar',
      data: {
        labels: ['Good', 'Moderate', 'Poor'],
        datasets: [{
          label: 'Water Quality Count',
          data: [summary.good, summary.moderate, summary.poor],
          backgroundColor: ['green', 'orange', 'red']
        }]
      }
    });
  }

  createTrendChart(trends: any[]) {
    const dates = trends.map(t => t.date);
    const good = trends.map(t => t.good);
    const moderate = trends.map(t => t.moderate);
    const poor = trends.map(t => t.poor);

    new Chart('trendChart', {
      type: 'line',
      data: {
        labels: dates,
        datasets: [
          {
            label: 'Good',
            data: good,
            borderColor: 'green',
            fill: false
          },
          {
            label: 'Moderate',
            data: moderate,
            borderColor: 'orange',
            fill: false
          },
          {
            label: 'Poor',
            data: poor,
            borderColor: 'red',
            fill: false
          }
        ]
      }
    });
  }
}
