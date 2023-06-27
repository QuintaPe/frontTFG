import { Component, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
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

export class CampingSearcherComponent {
  @Output() onSearch = new EventEmitter()
  place: any = {
    location: '',
    lat: null,
    lng: null,
  };
  date = {
    start: '',
    end: '',
  };
  people = '';
  loading = false;

  emitValues = () => {
    this.onSearch.emit({
      place: this.place,
      date: this.date,
      people: this.people
    })
  }
}
