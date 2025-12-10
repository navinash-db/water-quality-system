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

  // Initialize with empty array
  readings: any[] = [];

  constructor(private waterService: Water) {}

  ngOnInit() {
    this.waterService.getAll().subscribe({
      next: (data) => {
        this.readings = data;
      },
      error: (err) => {
        console.error("Error fetching readings:", err);
      }
    });
  }
}