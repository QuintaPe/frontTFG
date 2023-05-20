import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';


@Injectable({
  providedIn: "root",
})
export class BookingService {
  private apiService = inject(ApiService);

  async getAvailableLodgings(id: string, startDate: Date, endDate: Date, page: number, size: number, search: string, filters: any, sort: string) {
    return this.apiService.fetch('GET', `campings/${id}/lodgings/availables`, {
      startDate, endDate, page, size, search, filters, sort
    });
  }

}
