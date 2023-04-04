import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Camping } from "@models/camping";
import { ApiService } from "@app/shared/services/api.service";

@Injectable({
  providedIn: "root",
})

export class CampingService {
  selectedCamping: Camping;
  
  constructor(private http: HttpClient, private apiService: ApiService) {
    this.selectedCamping = new Camping();
  }

  postCamping(camping: Camping) {
    return this.apiService.fetch('POST', 'campings', { ...camping });
  }

  async getCampings(params: any) {
    return this.apiService.fetch('GET', 'campings', params)
  }

  // getCamping(id: String) {
  //   return this.http.get<Camping>(this.URL_API + `/${id}`);
  // }

  // putCamping(camping: Camping) {
  //   return this.http.put(this.URL_API + `/${camping._id}`, camping);
  // }

  // deleteCamping(_id: string) {
  //   return this.http.delete(this.URL_API + `/${_id}`);
  // }
}
