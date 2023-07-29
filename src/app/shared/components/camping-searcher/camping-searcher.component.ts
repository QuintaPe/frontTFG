import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { InputTextComponent } from '../inputs/input-text/input-text.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { InputDateRangeComponent } from '../inputs/input-date-range/input-date-range.component';
import { InputCitiesComponent } from '../inputs/input-cities/input-cities.component';
import { ErrorService } from '@app/core/services/errors.service';

@Component({
  selector: 'app-camping-searcher',
  templateUrl: 'camping-searcher.component.html',
  styleUrls: ['camping-searcher.component.scss'],
  standalone: true,
  imports: [
    InputTextComponent,
    InputCitiesComponent,
    InputDateRangeComponent,
    ButtonComponent,
    TranslateModule,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class CampingSearcherComponent implements OnInit {
  @Input() lat: string = '';
  @Input() lng: string = '';
  @Input() type: string = '';
  @Input() entryDate: string = '';
  @Input() exitDate: string = '';
  @Input() capacity: string = '';
  @Output() onSearch = new EventEmitter();
  @Output() onInit = new EventEmitter();
  location = '';
  loading = false;
  geocoder!: google.maps.Geocoder;

  private errorService = inject(ErrorService)
  private translate = inject(TranslateService)

  ngOnInit(): void {
    this.geocoder = new google.maps.Geocoder();
    if (this.lat && this.lng) {
      this.geocoder.geocode(
        { location: { lat: +this.lat, lng: +this.lng } },
        (results, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            if (this.type) {
              results = results.filter((result) => {
                return result.types.includes(this.type);
              });
            }

            if (results.length > 0) {
              this.location = results[0].formatted_address;
              this.type = results[0].types[0];
              this.onInit.emit(this.location);
            }
          }
        }
      );
    }
  }

  handleCityChange(place: any) {
    this.location = place.location;
    this.lat = place.lat;
    this.lng = place.lng;
    this.type = place.type;
  }

  handleDateChange(dates: any) {
    this.entryDate = dates.start;
    this.exitDate = dates.end;
  }

  emitValues = async () => {
    if (this.location && (!this.lat || !this.lng)) {
      await this.geocoder.geocode({ address: this.location }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          const result = results[0];
          this.location = result.formatted_address;
          this.lat = result.geometry.location.lat().toString();
          this.lng = result.geometry.location.lng().toString();
          this.type = result.types[0];
        } else {
          this.errorService.setError({ name: 'location_not_found' });
        }
      });
    }
    const emitObject: any = {
      location: this.location,
      lat: this.lat,
      lng: this.lng,
      type: this.type,
      entryDate: this.entryDate,
      exitDate: this.exitDate,
      capacity: this.capacity
    };

    if (Object.keys(emitObject).some((att: string) => !emitObject[att])) {
      console.log(emitObject);
      this.errorService.setError({
        name: 'required',
        field: this.translate.instant(`campsite.${Object.keys(emitObject).find((att: string) => !emitObject[att])}`)
      });
    } else {
      this.onSearch.emit(emitObject);
    }
  };
}
