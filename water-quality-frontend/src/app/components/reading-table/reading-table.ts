import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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

  constructor(private waterService: Water) {}

  ngOnInit() {
    this.waterService.getAll().subscribe({
      next: (data) => {
        console.log('Data received from backend:', data); // Check your browser console for this!
        this.readings = data;
      },
      error: (err) => {
        console.error('Error fetching data:', err); // Check console for red errors
      }
    });
  }
}