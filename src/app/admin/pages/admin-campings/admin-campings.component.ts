import { Component, inject } from '@angular/core';
import { CampingService } from '@app/camping/services/camping.service';

@Component({
  selector: 'app-admin-campings',
  templateUrl: './admin-campings.component.html',
  styleUrls: ['./admin-campings.component.scss']
})

export class AdminCampingsComponent {
  private campingService = inject(CampingService);


  getCampings = async (page:any, size:any, search:any, filters:any, sort:any) => {
    return await this.campingService.getOwnCampings({ page, size, search, filters, sort })
  }

}
