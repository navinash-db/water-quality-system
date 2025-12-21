import { Component, ChangeDetectorRef } from '@angular/core'; // <-- Import ChangeDetectorRef
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

  constructor(
    private waterService: WaterService, 
    private router: Router,
    private cdr: ChangeDetectorRef // <-- Inject it here
  ) {}

  save() {
    this.waterService.addReading(this.reading).subscribe({
      next: () => {
        this.message = 'Reading added successfully!';
        this.messageType = 'success';
        
        this.cdr.detectChanges(); // <-- FORCE UI UPDATE
        
        // Removed timeout for instant redirect
        this.router.navigate(['/readings']);
      },
      error: (err) => {
        console.error(err);
        this.message = 'Error adding reading. Please check your inputs.';
        this.messageType = 'error';
        this.cdr.detectChanges(); // <-- FORCE UI UPDATE ON ERROR TOO
      }
    });
  }
}