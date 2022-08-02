import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConcertApiService } from 'src/app/core/services/concert-api.service';
import { Booked } from 'src/app/core/state/booked-event.model';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  public eventInfo: any;
  public availableEvent: boolean = true;
  public availableInfo = [68, 184];
  public hasBookings: boolean | undefined;

  public loading: boolean = true;

  public shoppingCart = this.concertService.selectedDates;
  public actualVisitedEvent: any;

  constructor(
    private concertService: ConcertApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const eventID = this.route.snapshot.paramMap.get('id');
    this.hasBookings = this.keyExists(this.shoppingCart, 'booked');

    this.availableInfo.includes(+eventID!)
      ? this.getEventInfo(eventID)
      : ((this.loading = false), (this.availableEvent = false));

    console.log('TEST: availableEvent => ', this.availableEvent);
  }

  /**
   * Gets information of the visited event
   * @param eventID
   */
  public getEventInfo(eventID: string | null): void {
    this.concertService.getEventInfo(eventID).subscribe((res: any) => {
      this.eventInfo = res[0];
      this.eventInfo.sessions.sort((a: any, b: any) =>
        a.date > b.date ? 1 : -1
      );
      this.loading = false;

      // Add the artists event and sessions to the service if it isn't already
      if (!this.checkIfEventAlreadyExists(this.eventInfo.event.id)) {
        this.shoppingCart.push(this.eventInfo);
      }

      // Get event with booked property to show in input add/sustract
      this.actualVisitedEvent = this.shoppingCart.find((obj: any) => {
        return obj.event.id === this.eventInfo.event.id;
      });
    });
  }

  /**
   * Adds, sustracts or fully deletes a ticket in a specific session
   * @param eventInfo information of the event
   * @param eventDate date of the specific event
   * @param action action to perform
   */
  public addOrDeductTicket(
    eventInfo: any,
    eventDate: string,
    action: string
  ): void {
    // Find the event of the artist
    const event = this.shoppingCart.find((obj: any) => {
      return obj.event.id === eventInfo.id;
    });

    // Find the specific session
    const session = event.sessions.find((session: any) => {
      return session.date === eventDate;
    });

    if (action === 'add') {
      // If it already has "booked" and it's not at its limit, add one more
      if (
        session.hasOwnProperty('booked') &&
        session.booked < session.availability
      )
        session.booked += 1;
      // If it doesn't have property, create it with +1
      else if (!session.hasOwnProperty('booked')) session.booked = 1;
    } else if (action === 'deduct') {
      // If it has property and it's not zero, sustract one.
      if (session.hasOwnProperty('booked') && session.booked > 0) {
        session.booked -= 1;
        // If
        if (session.booked === 0) delete session.booked;
      }
    }

    this.keyExists(event, 'booked')
      ? (event.hasBookings = true)
      : (event.hasBookings = false);
  }

  /**
   * Checks if the event is already int he shopping cart
   * @param eventId
   * @returns
   */
  public checkIfEventAlreadyExists(eventId: string) {
    if (this.shoppingCart.find((obj: any) => obj.event.id === eventId))
      return true;
    else return false;
  }

  /**
   * Checks throughout the object if a key exists
   * @param obj object to search
   * @param key key to search
   * @returns
   */
  public keyExists = (obj: any, key: string) => {
    if (!obj || (typeof obj !== 'object' && !Array.isArray(obj))) {
      return false;
    } else if (obj.hasOwnProperty(key)) {
      return true;
    } else if (Array.isArray(obj)) {
      for (let i = 0; i < obj.length; i++) {
        const result: any = this.keyExists(obj[i], key);
        if (result) {
          return result;
        }
      }
    } else {
      for (const k in obj) {
        const result: any = this.keyExists(obj[k], key);
        if (result) {
          return result;
        }
      }
    }

    return false;
  };
}
