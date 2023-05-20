import { Injectable } from "@angular/core";
import { Camping } from "@models/camping";
import { ApiService } from "@core/services/api.service";

@Injectable({
  providedIn: "root",
})

export class CampingService {
  selectedCamping: Camping;

  constructor(private apiService: ApiService) {
    this.selectedCamping = new Camping();
  }

  async getCamping(id: String) {
    return this.apiService.fetch('GET', `campings/${id}`);
  }

  async getCampingLodgings(id: String) {
    return this.apiService.fetch('GET', `campings/${id}/lodgings`);
  }

  async postCamping(camping: Camping) {
    return this.apiService.fetch('POST', 'campings', { ...camping });
  }

  async getCampings(params: any) {
    return this.apiService.fetch('GET', 'campings', params);
  }

  async getFullCamping(id: String) {
    return this.apiService.fetch('GET', `campings/${id}/full`);
  }

  async putCamping(camping: Camping) {
    return  this.apiService.fetch('PUT', `campings/${camping._id}`, { ...camping });
  }

  async deleteCamping(id: string) {
    return this.apiService.fetch('DELETE', `campings/${id}`);
  }

  async getCampingBookings(id: string, page: number, size: number, search: string, filters: any, sort: string) {
    return this.apiService.fetch('GET', `campings/${id}/bookings` , {
      page, size, search, filters, sort,
    });
  }

  async deleteCampingBooking(id: string, booking: string) {
    return this.apiService.fetch('DELETE', `campings/${id}/bookings/${booking}`)
  }

}
