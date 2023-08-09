import { Component, Type, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MANAGER_ROUTES } from '@app/core/routes';
import { CampingService } from '@app/camping/services/camping.service';
import { CampingRowComponent } from '@app/camping/components/camping-row/camping-row.component';

@Component({
  selector: 'app-my-campings',
  templateUrl: './my-campings.component.html',
  styleUrls: ['./my-campings.component.scss']
})

export class MyCampingsComponent {
  campingRowType: Type<any> = CampingRowComponent
  private campingService = inject(CampingService);
  private router = inject(Router);
  protected componentInputs = ["_id", "name", "description", "images", "location"];

  handleNewCamping = () => {
    this.router.navigateByUrl(MANAGER_ROUTES.NEW_CAMPING.url)
  }

  getCampings = async (page:any, size:any, search:any, filters:any, sort:any) => {
    return await this.campingService.getOwnCampings({ page, size, search, filters, sort })
  }

}
