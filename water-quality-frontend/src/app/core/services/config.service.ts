import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private baseUrl = 'http://localhost:8080/api/config';

  constructor(private http: HttpClient) {}

  getThresholds() {
    return this.http.get<any>(`${this.baseUrl}/thresholds`);
  }

  updateThresholds(data: any) {
    return this.http.put<any>(`${this.baseUrl}/thresholds`, data);
  }

  resetDefaults() {
    return this.http.post<any>(`${this.baseUrl}/reset`, {});
  }
}