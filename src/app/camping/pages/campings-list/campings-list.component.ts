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
import { CampingRowComponent } from '../../components/camping-row/camping-row.component';

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
  @Input() entryDate: string = '';
  @Input() exitDate: string = '';
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
    this.entryDate = event.entryDate;
    this.exitDate = event.exitDate;
    this.capacity = event.capacity;
    this.forceFetch += 1;

    const params = [
      `lat=${event.lat || ''}`,
      `lng=${event.lng || ''}`,
      `type=${event.type || ''}`,
      `entryDate=${event.entryDate || ''}`,
      `exitDate=${event.exitDate || ''}`,
      `capacity=${event.capacity || ''}`,
    ].filter((elem) => !elem.endsWith("="));

    this._location.go(CAMPINGS_ROUTES.CAMPINGS.url + (params.length ? `?${params.join('&')}` : ''));
  };

  getCampingList = (page: number, size: number) => {
    return  this.campingService.getAvailableCampings(
      +this.lat, +this.lng, this.entryDate, this.exitDate, +this.capacity,
      { page, size })
  }
}
