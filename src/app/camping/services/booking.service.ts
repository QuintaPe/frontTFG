import { Injectable } from "@angular/core";
import { Camping } from "@models/camping";
import { ApiService } from "@core/services/api.service";

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
    console.log(this.bookingData)
    return this.bookingData;

  }
}
