import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class DashboardComponent {

  constructor(private router: Router) {}

  goToAddReading() {
    this.router.navigate(['/add-reading']);
  }

  goToReadings() {
    this.router.navigate(['/readings']);
  }

}
