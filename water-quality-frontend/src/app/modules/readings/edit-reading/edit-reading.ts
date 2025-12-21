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
  message = '';      // Stores the success/error text
  messageType = '';  // 'success' or 'error'

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private waterService: WaterService,
    private cdr: ChangeDetectorRef
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
        // Show Success Message
        this.message = 'Water reading updated successfully! Redirecting...';
        this.messageType = 'success';
        
        // Wait 1.5 seconds so user can read it, then go back
        setTimeout(() => {
          this.router.navigate(['/readings']);
        }, 1500);
      },
      error: (err) => {
        this.message = 'Error updating reading. Please try again.';
        this.messageType = 'error';
        console.error(err);
      }
    });
  }

  cancel() {
    this.router.navigate(['/readings']);
  }
}