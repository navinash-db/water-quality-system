import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { WaterService } from '../../../core/services/water.service';
import { Navbar } from '../../../shared/navbar/navbar';

@Component({
  selector: 'app-list-reading',
  standalone: true,
  imports: [CommonModule, Navbar, RouterModule],
  templateUrl: './list-reading.html',
  styleUrl: './list-reading.css'
})
export class ListReading {

  readings$!: Observable<any[]>;
  
  // Modal State
  showModal = false;
  idToDelete: number | null = null;
  message = '';

  constructor(private waterService: WaterService) {
    this.loadData();
  }

  loadData() {
    this.readings$ = this.waterService.getAll();
  }

  // 1. Triggered when user clicks "Delete" button in table
  confirmDelete(id: number) {
    this.idToDelete = id;
    this.showModal = true; // Show the custom modal
  }

  // 2. Triggered when user clicks "Yes, Delete" in modal
  deleteNow() {
    if (this.idToDelete === null) return;

    this.waterService.delete(this.idToDelete).subscribe(() => {
      this.message = 'Reading deleted successfully.';
      this.closeModal();
      this.loadData(); // Refresh list without reloading page
      
      // Clear message after 3 seconds
      setTimeout(() => this.message = '', 3000);
    });
  }

  // 3. Triggered when user clicks "Cancel"
  closeModal() {
    this.showModal = false;
    this.idToDelete = null;
  }
}