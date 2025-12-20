import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AlertService } from '../../../core/services/alert.service';
import { Navbar } from '../../../shared/navbar/navbar';

@Component({
  selector: 'app-alerts-list',
  standalone: true,
  imports: [CommonModule, Navbar],
  templateUrl: './alerts-list.html',
  styleUrl: './alerts-list.css'
})
export class AlertsList {

  alerts$!: Observable<any[]>;

  constructor(private alertService: AlertService) {
    this.loadAlerts();
  }

  loadAlerts() {
    this.alerts$ = this.alertService.getAll();
  }

  markRead(id: number) {
    this.alertService.markAsRead(id).subscribe(() => {
      this.loadAlerts();
    });
  }

  deleteAlert(id: number) {
    if (confirm('Are you sure you want to delete this alert?')) {
      this.alertService.delete(id).subscribe(() => {
        this.loadAlerts();
      });
    }
  }
}
