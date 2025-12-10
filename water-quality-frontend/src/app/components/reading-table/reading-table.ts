import { CommonModule } from '@angular/common';
// 1. Add ChangeDetectorRef to the imports
import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; 
import { Water } from '../../services/water'; 

@Component({
  selector: 'app-reading-table',
  standalone: true,
  templateUrl: './reading-table.html',
  styleUrls: ['./reading-table.css'],
  imports: [CommonModule]
})
export class ReadingTableComponent implements OnInit {
  readings: any[] = [];

  // 2. Inject ChangeDetectorRef in the constructor
  constructor(private waterService: Water, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.waterService.getAll().subscribe({
      next: (data) => {
        console.log('Data received from backend:', data);
        this.readings = data;
        
        // 3. THIS IS THE KEY FIX: Force Angular to update the screen
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('Error fetching data:', err);
      }
    });
  }
}