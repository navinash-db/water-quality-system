import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../../shared/navbar/navbar'; // Adjust path if needed
import { AlertService } from '../../../core/services/alert.service';

@Component({
  selector: 'app-alerts-list',
  standalone: true,
  imports: [CommonModule, Navbar],
  templateUrl: './alerts-list.html',
  styleUrl: './alerts-list.css'
})
export class AlertsList implements OnInit {

  // FIX: Define this as a simple array, NOT an Observable ($)
  alerts: any[] = []; 
  
  // Modal State
  showModal = false;
  idToDelete: number | null = null;

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.loadAlerts();
  }

  loadAlerts() {
    // FIX: Subscribe here to get the data into the array
    this.alertService.getAll().subscribe(res => {
      this.alerts = res;
    });
  }

  confirmDelete(id: number) {
    this.idToDelete = id;
    this.showModal = true;
  }

  deleteNow() {
    if (this.idToDelete === null) return;
    
    this.alertService.delete(this.idToDelete).subscribe(() => {
      this.loadAlerts(); // Reload list
      this.closeModal(); // Close modal
    });
  }

  closeModal() {
    this.showModal = false;
    this.idToDelete = null;
  }
}