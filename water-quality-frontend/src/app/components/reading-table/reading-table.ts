import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-reading-table',
  standalone: true,
  templateUrl: './reading-table.html',
  styleUrls: ['./reading-table.css'],
  imports: [CommonModule]
})
export class ReadingTableComponent {

  readings = [
    { ph: 7.2, turbidity: 3, temperature: 24, oxygen: 6 },
    { ph: 6.8, turbidity: 4, temperature: 25, oxygen: 5.8 }
  ];

}
