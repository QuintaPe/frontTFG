import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { InputTextComponent } from '../inputs/input-text/input-text.component';
import { TranslateModule } from '@ngx-translate/core';
import { InputDateRangeComponent } from '../inputs/input-date-range/input-date-range.component';
import { InputCitiesComponent } from '../inputs/input-cities/input-cities.component';

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
  @Input() startDate: string = '';
  @Input() endDate: string = '';
  @Input() capacity: string = '';
  @Output() onSearch = new EventEmitter();
  @Output() onInit = new EventEmitter();
  location = '';
  loading = false;

  ngOnInit(): void {
    if (this.lat && this.lng) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode(
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
    this.startDate = dates.start;
    this.endDate = dates.end;
  }

  emitValues = () => {
    this.onSearch.emit({
      location: this.location,
      lat: this.lat,
      lng: this.lng,
      type: this.type,
      startDate: this.startDate,
      endDate: this.endDate,
      capacity: this.capacity
    });
  };
}
