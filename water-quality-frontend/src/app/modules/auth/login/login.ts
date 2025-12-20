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
      if (res.username) {
        // store user info
        localStorage.setItem('user', JSON.stringify(res));

        // go to dashboard
        this.router.navigate(['/dashboard']);
      }
    },
    () => {
      console.error('Login failed');
    }
  );
}
}
