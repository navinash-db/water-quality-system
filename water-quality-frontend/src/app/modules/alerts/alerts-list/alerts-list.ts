import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // <-- 1. Import ChangeDetectorRef
import { CommonModule } from '@angular/common';
import { Navbar } from '../../../shared/navbar/navbar';
import { AlertService } from '../../../core/services/alert.service';

@Component({
  selector: 'app-alerts-list',
  standalone: true,
  imports: [CommonModule, Navbar],
  templateUrl: './alerts-list.html',
  styleUrl: './alerts-list.css'
})
export class AlertsList implements OnInit {

  alerts: any[] = []; 
  
  showModal = false;
  idToDelete: number | null = null;

  constructor(
    private alertService: AlertService,
    private cdr: ChangeDetectorRef // <-- 2. Inject it here
  ) {}

  ngOnInit() {
    this.loadAlerts();
  }

  loadAlerts() {
    this.alertService.getAll().subscribe({
      next: (res) => {
        console.log('Alerts loaded:', res);
        this.alerts = res;
        
        // <-- 3. FORCE UPDATE: Tell Angular to refresh the view immediately
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('Error loading alerts:', err);
      }
    });
  }

  confirmDelete(id: number) {
    this.idToDelete = id;
    this.showModal = true;
  }

  deleteNow() {
    if (this.idToDelete === null) return;
    
    this.alertService.delete(this.idToDelete).subscribe(() => {
      this.loadAlerts();
      this.closeModal();
    });
  }

  closeModal() {
    this.showModal = false;
    this.idToDelete = null;
  }
}