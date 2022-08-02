import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ConcertApiService {
  public selectedDates: any;

  constructor(private http: HttpClient) {}

  /**
   * Get all concerts
   */
  public getEvents = () => this.http.get('http://localhost:3000/concerts');

  /**
   * Get specific event
   */
  public getEventInfo = (eventID: string | null) =>
    this.http.get('http://localhost:3000/' + eventID);
}
