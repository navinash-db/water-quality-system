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

  constructor(private waterService: WaterService) {
    this.loadData();
  }

  loadData() {
    this.readings$ = this.waterService.getAll();
  }

  deleteReading(id: number) {
    const ok = confirm('Are you sure you want to delete this reading?');

    if (!ok) return;

    this.waterService.delete(id).subscribe(() => {
      alert('Water reading deleted successfully');

      // 🔴 FORCE PAGE REFRESH (THIS IS THE KEY)
      window.location.reload();
    });
  }
}
