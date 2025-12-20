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

  ph = 0;
  turbidity = 0;
  tds = 0;
  temperature = 0;
  location = '';

  constructor(
    private waterService: WaterService,
    private router: Router
  ) {}

  addReading() {
    const data = {
      ph: this.ph,
      turbidity: this.turbidity,
      tds: this.tds,
      temperature: this.temperature,
      location: this.location
    };

    this.waterService.addReading(data).subscribe(
      () => {
        this.router.navigate(['/readings']);
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
