import { Component, Type, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CAMPINGS_MANAGEMENT_ROUTES } from '@app/core/routes';
import { CampingService } from '@app/camping/services/camping.service';
import { CampingRowComponent } from './components/camping-row/camping-row.component';

@Component({
  selector: 'app-camping',
  templateUrl: './camping.component.html',
  styleUrls: ['./camping.component.scss']
})

export class CampingComponent {
  campingRowType: Type<any> = CampingRowComponent
  private campingService = inject(CampingService);
  private router = inject(Router);

  handleNewCamping = () => {console.log(CAMPINGS_MANAGEMENT_ROUTES.NEW_CAMPING.url)
    this.router.navigateByUrl(CAMPINGS_MANAGEMENT_ROUTES.NEW_CAMPING.url)
  }

  getCampings = async (page:any, size:any, search:any, filters:any, sort:any) => {
    return await this.campingService.getCampings({ page, size, search, filters, sort })
  }

}
