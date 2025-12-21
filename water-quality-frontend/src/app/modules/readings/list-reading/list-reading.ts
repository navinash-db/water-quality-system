import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef } from '@angular/core'; // <-- Import
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
  
  showModal = false;
  idToDelete: number | null = null;
  message = '';

  constructor(
    private waterService: WaterService,
    private cdr: ChangeDetectorRef // <-- Inject
  ) {
    this.loadData();
  }

  loadData() {
    this.readings$ = this.waterService.getAll();
  }

  confirmDelete(id: number) {
    this.idToDelete = id;
    this.showModal = true;
  }

  deleteNow() {
    if (this.idToDelete === null) return;

    this.waterService.delete(this.idToDelete).subscribe(() => {
      this.message = 'Reading deleted successfully.';
      this.closeModal();
      this.loadData(); 
      
      this.cdr.detectChanges(); // <-- FORCE UPDATE (Closes modal visually)
      
      setTimeout(() => {
        this.message = '';
        this.cdr.detectChanges(); // <-- Update again when message fades
      }, 3000);
    });
  }

  closeModal() {
    this.showModal = false;
    this.idToDelete = null;
  }
}