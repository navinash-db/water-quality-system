import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { WaterService } from '../../../core/services/water.service';
import { Navbar } from '../../../shared/navbar/navbar';

@Component({
  selector: 'app-edit-reading',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    Navbar
  ],
  templateUrl: './edit-reading.html',
  styleUrl: './edit-reading.css'
})
export class EditReading implements OnInit {

  id!: number;
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private waterService: WaterService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      location: [''],
      ph: [0],
      turbidity: [0],
      tds: [0],
      temperature: [0]
    });

    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      this.loadReading();
    });
  }

  loadReading() {
    this.waterService.getById(this.id).subscribe(res => {
      this.form.patchValue(res);   // 🔥 KEY LINE
    });
  }

  updateReading() {
    this.waterService.update(this.id, this.form.value).subscribe(() => {
      alert('Water reading updated successfully');
      this.router.navigate(['/readings']);
    });
  }
}
