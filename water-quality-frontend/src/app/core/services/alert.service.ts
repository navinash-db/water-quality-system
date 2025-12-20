import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private baseUrl = 'http://localhost:8080/api/alerts';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any[]>(this.baseUrl);
  }

  getUnread() {
    return this.http.get<any[]>(this.baseUrl + '/unread');
  }

  markAsRead(id: number) {
    return this.http.put(this.baseUrl + '/' + id + '/read', {}, {
      responseType: 'text'
    });
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + '/' + id, {
      responseType: 'text'
    });
  }
}
