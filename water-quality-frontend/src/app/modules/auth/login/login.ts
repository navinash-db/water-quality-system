import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  username = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    const data = {
      username: this.username,
      password: this.password
    };

    this.authService.login(data).subscribe(
      (res: any) => {
        // Check if the backend actually returned a user
        if (res && res.username) {
          localStorage.setItem('user', JSON.stringify(res));
          this.router.navigate(['/dashboard']);
        } else {
          // Backend said "200 OK" but credential check failed
          alert('Invalid username or password!'); 
        }
      },
      (err) => {
        // Backend is down or threw a 500 error
        console.error(err);
        alert('Server connection failed. Is the backend running?');
      }
    );
  }
}