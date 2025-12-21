import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { WaterService } from '../../../core/services/water.service';
import { Navbar } from '../../../shared/navbar/navbar';

@Component({
  selector: 'app-edit-reading',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, 
    RouterModule,
    Navbar
  ],
  templateUrl: './edit-reading.html',
  styleUrl: './edit-reading.css'
})
export class EditReading implements OnInit {

  id!: number;
  
  // Define the object to match the HTML
  reading = {
    location: '',
    ph: 0,
    turbidity: 0,
    tds: 0,
    temperature: 0
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private waterService: WaterService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      this.loadReading();
    });
  }

  loadReading() {
    this.waterService.getById(this.id).subscribe(res => {
      this.reading = {
        location: res.location,
        ph: res.ph,
        turbidity: res.turbidity,
        tds: res.tds,
        temperature: res.temperature
      };
    });
  }

  updateReading() {
    this.waterService.update(this.id, this.reading).subscribe(() => {
      alert('Water reading updated successfully');
      this.router.navigate(['/readings']);
    });
  }

  cancel() {
    this.router.navigate(['/readings']);
  }
}