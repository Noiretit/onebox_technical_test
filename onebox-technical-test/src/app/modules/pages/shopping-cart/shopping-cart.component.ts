import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConcertApiService } from 'src/app/core/services/concert-api.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  public eventInfo: any;
  public availableEvent: boolean = true;
  public availableInfo = [68, 184];

  constructor(
    private concertService: ConcertApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const eventID = this.route.snapshot.paramMap.get('id');

    this.availableInfo.includes(+eventID!)
      ? this.getEventInfo(eventID)
      : (this.availableEvent = false);
  }

  public getEventInfo(eventID: string | null): void {
    this.concertService.getEventInfo(eventID).subscribe((res: any) => {
      this.eventInfo = res[0];
      this.eventInfo.sessions.sort((a: any, b: any) =>
        a.date > b.date ? 1 : -1
      );
      console.log('TEST: eventInfo => ', this.eventInfo);
    });
  }
}
