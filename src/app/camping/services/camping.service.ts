import { Injectable } from "@angular/core";
import { Camping } from "@models/camping";
import { fetch } from "@utils/api";

@Injectable({
  providedIn: "root",
})

export class CampingService {
  selectedCamping: Camping;

  constructor() {
    this.selectedCamping = new Camping();
  }

  async getCamping(id: String) {
    return fetch('GET', `campings/${id}`);
  }

  async getCampingLodgings(id: String) {
    return fetch('GET', `campings/${id}/lodgings`);
  }

  async postCamping(camping: Camping) {
    return fetch('POST', 'campings', { ...camping });
  }

  async getOwnCampings(opts: any) {
    return fetch('GET', 'campings', { opts });
  }

  async getAvailableCampings(lat: number, lng: number, entryDate: string, exitDate:string, capacity: number, opts: any) {
    return fetch('GET', 'campings/availables', { lat, lng, entryDate, exitDate, capacity, opts });
  }

  async getFavoriteCampings(opts: any) {
    return fetch('GET', 'campings/favorites', { opts });
  }

  async getFullCamping(id: String) {
    return fetch('GET', `campings/${id}/full`);
  }

  async putCamping(camping: Camping) {
    return  fetch('PUT', `campings/${camping._id}`, { ...camping });
  }

  async deleteCamping(id: string) {
    return fetch('DELETE', `campings/${id}`);
  }

  async createCampingRelation(id: string, data: any) {
    const { favorite = null, review = null } = data
    return fetch('POST', `campings/${id}/relation`, { favorite, review });
  }

  async createCampingBooking(id: string, bookingData: Object) {
    return fetch('POST', `campings/${id}/bookings` , bookingData);
  }

  async getCampingBookings(id: string, page: number, size: number, search: string, filters: any, sort: string) {
    return fetch('GET', `campings/${id}/bookings` , {
      page, size, search, filters, sort,
    });
  }

  async deleteCampingBooking(id: string, booking: string) {
    return fetch('DELETE', `campings/${id}/bookings/${booking}`)
  }

  async changeBookingStatus(id: string, booking: string, status: string) {
    return fetch('PUT', `campings/${id}/bookings/${booking}/status/${status}`)
  }

  async getAvailableLodgings(id: string, entryDate: Date, exitDate: Date, opts: Object) {
    return fetch('GET', `campings/${id}/lodgings/availables`, {
      entryDate, exitDate, opts,
    });
  }

  async getCampingReviews(id: string, opts: any) {
    return fetch('GET', `campings/${id}/reviews`, { opts });
  }
}
