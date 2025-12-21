import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { WaterService } from '../../../core/services/water.service';
import { Navbar } from '../../../shared/navbar/navbar';

@Component({
  selector: 'app-add-reading',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, Navbar],
  templateUrl: './add-reading.html',
  styleUrl: './add-reading.css'
})
export class AddReading {

  reading = {
    location: '',
    ph: 7.0,
    turbidity: 0,
    tds: 0,
    temperature: 25.0
  };

  message = '';
  messageType = '';

  constructor(private waterService: WaterService, private router: Router) {}

  save() {
    // FIX: Changed .add() to .addReading() to match your Service file
    this.waterService.addReading(this.reading).subscribe({
      next: () => {
        this.message = 'Reading added successfully! Redirecting...';
        this.messageType = 'success';
        setTimeout(() => {
          this.router.navigate(['/readings']);
        }, 1500);
      },
      error: (err) => {
        console.error(err);
        this.message = 'Error adding reading. Please check your inputs.';
        this.messageType = 'error';
      }
    });
  }
}