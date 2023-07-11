import { Location } from '@angular/common';
import {
  Component,
  Input,
  inject,
  ViewEncapsulation,
  Type,
  HostListener,
} from '@angular/core';
import { CampingService } from '@app/camping/services/camping.service';
import { CAMPINGS_ROUTES } from '@app/core/routes';
import { Camping } from '@models/camping';
import { CampingRowComponent } from './components/camping-row/camping-row.component';

@Component({
  selector: 'app-campings-list',
  templateUrl: './campings-list.component.html',
  styleUrls: ['./campings-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CampingsListComponent {
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
  protected componentInputs = ["_id", "name", "description", "images", "ratings", "relation",
    "location", "distance", "createdAt", "loading", "totalCapacity", "availableCapacity"];

  private campingService = inject(CampingService);
  private _location = inject(Location);

  @HostListener('window:popstate', ['$event'])
  onPopState() {
    this.forceFetch += 1;
  }

  updateSearchParams = (event: any) => {
    this.location = event.location;
    this.lat = event.lat;
    this.lng = event.lng;
    this.type = event.type;
    this.startDate = event.startDate;
    this.endDate = event.endDate;
    this.capacity = event.capacity;
    this.forceFetch += 1;

    const params = [
      `lat=${event.lat || ''}`,
      `lng=${event.lng || ''}`,
      `type=${event.type || ''}`,
      `startDate=${event.startDate || ''}`,
      `endDate=${event.endDate || ''}`,
      `capacity=${event.capacity || ''}`,
    ].filter((elem) => !elem.endsWith("="));

    this._location.go(CAMPINGS_ROUTES.CAMPINGS.url + (params.length ? `?${params.join('&')}` : ''));
  };

  getCampingList = (page: number, size: number) => {
    return  this.campingService.getAvailableCampings(
      +this.lat, +this.lng, this.startDate, this.endDate, +this.capacity,
      { page, size })
  }
}
