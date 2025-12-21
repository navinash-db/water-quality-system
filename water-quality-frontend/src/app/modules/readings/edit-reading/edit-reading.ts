import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { WaterService } from '../../../core/services/water.service';
import { Navbar } from '../../../shared/navbar/navbar';

@Component({
  selector: 'app-edit-reading',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, Navbar],
  templateUrl: './edit-reading.html',
  styleUrl: './edit-reading.css'
})
export class EditReading implements OnInit {

  id!: number;
  reading: any = null;
  message = '';     
  messageType = ''; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private waterService: WaterService,
    private cdr: ChangeDetectorRef // Already injected
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      this.loadReading();
    });
  }

  loadReading() {
    this.waterService.getById(this.id).subscribe(res => {
      this.reading = res;
      this.cdr.detectChanges(); 
    });
  }

  updateReading() {
    this.waterService.update(this.id, this.reading).subscribe({
      next: () => {
        this.message = 'Water reading updated successfully!';
        this.messageType = 'success';
        
        this.cdr.detectChanges(); // <-- ADD THIS LINE
        
        this.router.navigate(['/readings']); // Instant redirect
      },
      error: (err) => {
        this.message = 'Error updating reading. Please try again.';
        this.messageType = 'error';
        console.error(err);
        this.cdr.detectChanges(); // <-- AND HERE
      }
    });
  }

  cancel() {
    this.router.navigate(['/readings']);
  }
}