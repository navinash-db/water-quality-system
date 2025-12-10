import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Water } from '../../services/water';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('phChart') private chartRef!: ElementRef;
  
  chart: any;
  readings: any[] = [];
  
  // Flag to track if HTML is ready
  private isViewReady = false; 

  constructor(private router: Router, private waterService: Water) {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.fetchData();
  }

  ngAfterViewInit() {
    // 1. The view is now ready
    this.isViewReady = true;
    
    // 2. If data arrived BEFORE the view was ready, draw the chart now
    if (this.readings.length > 0) {
      this.createChart();
    }
  }

  fetchData() {
    this.waterService.getAll().subscribe((data) => {
      this.readings = data;
      
      // 3. Only draw chart if the View is ALREADY ready
      if (this.isViewReady) {
        this.createChart();
      }
    });
  }

  createChart() {
    // Safety check: ensure the element exists
    if (!this.chartRef?.nativeElement) return; 

    if (this.chart) this.chart.destroy();

    // 1. Prepare Data
    const recentReadings = this.readings.slice(-10);
    const phValues = recentReadings.map(r => r.ph);

    // 2. Calculate "Prediction" (Linear Regression)
    const { slope, intercept } = calculateTrend(phValues);

    // 3. Generate 5 Future Prediction Points
    const futurePhValues: (number | null)[] = new Array(phValues.length).fill(null);
    const futureLabels: string[] = [];

    // Connect lines
    if (phValues.length > 0) {
       futurePhValues[phValues.length - 1] = phValues[phValues.length - 1];
    }

    for (let i = 1; i <= 5; i++) {
      const nextIndex = phValues.length - 1 + i;
      const predictedValue = slope * nextIndex + intercept;
      futurePhValues.push(predictedValue);
      futureLabels.push(`Pred-${i}`);
    }

    // Combine labels
    const labels = [
      ...recentReadings.map(r => `ID: ${r.id}`),
      ...futureLabels
    ];

    // 4. Render Chart
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Actual pH (Real-time)',
            data: phValues,
            borderColor: '#1976d2',
            backgroundColor: 'rgba(25, 118, 210, 0.2)',
            fill: true,
            tension: 0.3
          },
          {
            label: 'Predicted Trend (AI)',
            data: [...new Array(phValues.length).fill(null), ...futurePhValues.slice(phValues.length)],
            borderColor: '#ff9800',
            borderDash: [5, 5],
            fill: false,
            tension: 0
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Water Quality Analysis & Prediction'
          }
        },
        scales: {
          y: {
            display: true,
            title: { display: true, text: 'pH Level' }
          }
        }
      }
    });
  }

  goToAddReading() {
    this.router.navigate(['/add-reading']);
  }

  goToReadings() {
    this.router.navigate(['/readings']);
  }
}

// Helper function
function calculateTrend(values: number[]) {
  const n = values.length;
  if (n === 0) return { slope: 0, intercept: 0 };

  const x = Array.from({ length: n }, (_, i) => i);
  const y = values;

  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
  const sumXX = x.reduce((sum, xi) => sum + xi * xi, 0);

  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  return { slope, intercept };
}