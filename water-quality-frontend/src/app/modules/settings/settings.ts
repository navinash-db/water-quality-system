import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../../shared/navbar/navbar';
import { ConfigService } from '../../core/services/config.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, Navbar, FormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css'
})
export class Settings implements OnInit {

  config: any = null;
  message = '';
  messageType = '';

  constructor(
    private configService: ConfigService,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit() {
    this.loadConfig();
  }

  loadConfig() {
    this.configService.getThresholds().subscribe({
      next: (res) => {
        this.config = res;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading config', err);
        // Optional: Handle error state here
      }
    });
  }

  saveSettings() {
    this.configService.updateThresholds(this.config).subscribe({
      next: (res) => {
        this.config = res;
        this.showMessage('Safety thresholds updated successfully!', 'success');
        this.cdr.detectChanges(); 
      },
      error: () => {
        this.showMessage('Failed to update settings.', 'error');
        this.cdr.detectChanges(); 
      }
    });
  }

  resetToDefaults() {
    if(!confirm('Are you sure you want to reset to system defaults?')) return;
    
    this.configService.resetDefaults().subscribe({
      next: (res) => {
        this.config = res;
        this.showMessage('System defaults restored.', 'success');
        this.cdr.detectChanges();
      },
      error: () => {
        this.showMessage('Failed to reset defaults.', 'error');
        this.cdr.detectChanges();
      }
    });
  }

  showMessage(msg: string, type: string) {
    this.message = msg;
    this.messageType = type;
    this.cdr.detectChanges(); 
    
    setTimeout(() => {
      this.message = '';
      this.cdr.detectChanges(); 
    }, 3000);
  }
}