import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private baseUrl = 'http://localhost:8080/api/reports';

  constructor(private http: HttpClient) {}

  getDaily(date: string) {
    return this.http.get<any>(this.baseUrl + '/daily?date=' + date);
  }

  getMonthly(month: string) {
    return this.http.get<any>(this.baseUrl + '/monthly?month=' + month);
  }

  exportDaily(date: string) {
    return this.http.get(
      this.baseUrl + '/export?type=daily&date=' + date,
      { responseType: 'text' }
    );
  }

  exportMonthly(month: string) {
    return this.http.get(
      this.baseUrl + '/export?type=monthly&month=' + month,
      { responseType: 'text' }
    );
  }
}
