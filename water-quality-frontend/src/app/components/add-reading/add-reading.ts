import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Water } from '../../services/water'; // Import the service

@Component({
  selector: 'app-add-reading',
  standalone: true,
  templateUrl: './add-reading.html',
  styleUrls: ['./add-reading.css'],
  imports: [FormsModule]
})
export class AddReadingComponent {

  reading = {
    ph: 0,
    turbidity: 0,
    tds: 0, // Changed from oxygen to match backend entity
    temperature: 0,
    location: "Lab 1" // Added default location if needed
  };

  // Inject Water Service and Router
  constructor(private waterService: Water, private router: Router) {}

  submitReading() {
    // Call the backend service
    this.waterService.addReading(this.reading).subscribe({
      next: (response) => {
        alert("Reading saved successfully!");
        this.router.navigate(['/readings']); // Redirect to list
      },
      error: (err) => {
        console.error("Error saving reading:", err);
        alert("Failed to save reading.");
      }
    });
  }
}