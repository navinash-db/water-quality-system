import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post(this.baseUrl + '/auth/login', data);
  }

  // --- ADD THIS METHOD ---
  logout() {
    localStorage.removeItem('user'); 
    // If you implemented tokens, you would remove them here too
  }
}