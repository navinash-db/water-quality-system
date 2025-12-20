import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseUrl = 'http://localhost:8080/api/dashboard';

  constructor(private http: HttpClient) {}

  getLatest() {
    return this.http.get<any>(this.baseUrl + '/latest');
  }

  getSummary() {
    return this.http.get<any>(this.baseUrl + '/summary');
  }

  getAverage() {
    return this.http.get<any>(this.baseUrl + '/average');
  }

  getTrends() {
    return this.http.get<any[]>(this.baseUrl + '/trends');
  }
}
