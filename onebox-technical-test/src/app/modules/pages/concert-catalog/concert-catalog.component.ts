import { Component, OnInit } from '@angular/core';
import { ConcertApiService } from 'src/app/core/services/concert-api.service';

@Component({
  selector: 'app-concert-catalog',
  templateUrl: './concert-catalog.component.html',
  styleUrls: ['./concert-catalog.component.scss'],
})
export class ConcertCatalogComponent implements OnInit {
  public events: any;

  constructor(private concertService: ConcertApiService) {}

  ngOnInit(): void {
    this.getEvents();
  }

  public getEvents(): void {
    this.concertService.getEvents().subscribe((res: any) => {
      this.events = res;
      this.events.sort((a: any, b: any) => (a.endDate > b.endDate ? 1 : -1));
    });
  }
}
