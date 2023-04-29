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

  postCamping(camping: Camping) {
    return this.apiService.fetch('POST', 'campings', { ...camping });
  }

  async getCampings(params: any) {
    return this.apiService.fetch('GET', 'campings', params);
  }

  async getCamping(id: String) {
    return this.apiService.fetch('GET', `campings/${id}`);
  }

  putCamping(camping: Camping) {
    return  this.apiService.fetch('PUT', `campings/${camping._id}`, { ...camping });
  }

  deleteCamping(id: string) {
    return this.apiService.fetch('DELETE', `campings/${id}`);
  }
}
