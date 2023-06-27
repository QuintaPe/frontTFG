import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})

export class BookingService {
  private bookingData: any;

  constructor() { }

  setBookingData(data: any) {
    this.bookingData = data;
  }

  getBookingData(id: string) {
    if (id !== this.bookingData.camping) {
      throw new Error('Error');
    }

    return this.bookingData;
  }
}
