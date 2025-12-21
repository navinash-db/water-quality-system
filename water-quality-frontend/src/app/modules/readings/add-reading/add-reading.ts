import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { WaterService } from '../../../core/services/water.service';
import { Navbar } from '../../../shared/navbar/navbar';

@Component({
  selector: 'app-add-reading',
  standalone: true,
  imports: [FormsModule, Navbar],
  templateUrl: './add-reading.html',
  styleUrl: './add-reading.css'
})
export class AddReading {

  // Fix: Group individual fields into a 'reading' object to match the HTML
  reading = {
    ph: 0,
    turbidity: 0,
    tds: 0,
    temperature: 0,
    location: ''
  };

  constructor(
    private waterService: WaterService,
    private router: Router
  ) {}

  addReading() {
    // Send the entire 'reading' object directly
    this.waterService.addReading(this.reading).subscribe(
      () => {
        this.router.navigate(['/readings']);
      },
      (err) => {
        console.error(err);
      }
    );
  }
}