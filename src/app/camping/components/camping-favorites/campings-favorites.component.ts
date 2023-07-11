import {
  Component,
  Input,
  inject,
  ViewEncapsulation,
  Type,
} from '@angular/core';
import { CampingService } from '@app/camping/services/camping.service';
import { Camping } from '@models/camping';
import { CampingRowComponent } from '../campings-list/components/camping-row/camping-row.component';

@Component({
  selector: 'app-campings-favorites',
  templateUrl: './campings-favorites.component.html',
  styleUrls: ['./campings-favorites.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CampingsFavoritesComponent {
  @Input() lat: string = '';
  @Input() lng: string = '';
  @Input() type: string = '';
  @Input() startDate: string = '';
  @Input() endDate: string = '';
  @Input() capacity: string = '';

  location = ''
  forceFetch: number = 0;
  camping: Camping | null = null;
  campingRowType: Type<any> = CampingRowComponent;
  // protected componentInputs = ["_id", "name", "description", "images", "relation", "createdAt", "loading"];
  protected componentInputs = ["_id", "name", "description", "images", "ratings", "relation",
  "location", "createdAt", "loading", "totalCapacity"];

  private campingService = inject(CampingService);

  getFavoriteCampings = async (page: number, size: number) => {
    return this.campingService.getFavoriteCampings({ page, size })
  }
}
