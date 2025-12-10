import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// **Assumed interfaces based on backend controller structure (WaterController.java)**
export interface WaterReading {
  id: number;
  ph: number;
  tds: number; // Total Dissolved Solids
  turbidity: number;
  location: string;
  readingDate?: string; 
}

export interface WaterRequest {
  ph: number;
  tds: number;
  turbidity: number;
  location: string;
}
// **End of assumed interfaces**

@Injectable({
  providedIn: 'root',
})
export class Water {
  // Base URL for the Spring Boot water controller (assuming default port 8080)
  private apiUrl = 'http://localhost:8080/water'; 

  constructor(private http: HttpClient) {}

  /**
   * Calls GET /water/all to fetch all water readings
   * @returns An Observable of an array of WaterReading
   */
  getAll(): Observable<WaterReading[]> {
    return this.http.get<WaterReading[]>(`${this.apiUrl}/all`);
  }

  /**
   * Calls POST /water/add to submit a new water reading
   * @param request The WaterRequest object with reading data
   * @returns An Observable of the newly created WaterReading
   */
  addReading(request: WaterRequest): Observable<WaterReading> {
    return this.http.post<WaterReading>(`${this.apiUrl}/add`, request);
  }
}