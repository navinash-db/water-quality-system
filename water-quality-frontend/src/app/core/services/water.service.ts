import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WaterService {

  private baseUrl = 'http://localhost:8080/api/water-readings';

  constructor(private http: HttpClient) {}

  addReading(data: any) {
    return this.http.post(this.baseUrl, data);
  }
  getAll() {
    return this.http.get<any[]>(this.baseUrl);
  }
  delete(id: number) {
    return this.http.delete(this.baseUrl + '/' + id, {
      responseType: 'text'
    });
  }
  getById(id: number) {
    return this.http.get<any>(this.baseUrl + '/' + id);
  }
  update(id: number, data: any) {
    return this.http.put(this.baseUrl + '/' + id, data);
  }
}
