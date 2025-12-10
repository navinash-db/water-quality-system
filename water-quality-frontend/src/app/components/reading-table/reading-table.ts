import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Water } from '../../services/water'; // Import the Water service

@Component({
  selector: 'app-reading-table',
  standalone: true,
  templateUrl: './reading-table.html',
  styleUrls: ['./reading-table.css'],
  imports: [CommonModule]
})
export class ReadingTableComponent implements OnInit {

  // 1. Initialize as an empty array (removed the hardcoded data)
  readings: any[] = [];

  // 2. Inject the Water Service
  constructor(private waterService: Water) {}

  // 3. Fetch data from backend when the page loads
  ngOnInit() {
    this.waterService.getAll().subscribe({
      next: (data) => {
        this.readings = data;
        console.log('Readings fetched:', data);
      },
      error: (err) => {
        console.error('Error fetching readings:', err);
      }
    });
  }
}