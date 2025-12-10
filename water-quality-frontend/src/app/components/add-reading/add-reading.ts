import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
    temperature: 0,
    oxygen: 0
  };

  submitReading() {
    console.log("Reading submitted:", this.reading);

    alert("Reading saved (backend soon)");
  }
}
