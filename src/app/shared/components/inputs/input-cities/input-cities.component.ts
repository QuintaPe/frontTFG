import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { SkeletonComponent } from '../../skeleton/skeleton.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-input-cities',
  templateUrl: './input-cities.component.html',
  styleUrls: ['../inputs.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    SkeletonComponent,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class InputCitiesComponent implements OnInit {
  @Input() class: string = '';
  @Input() icon: string = '';
  @Input() preText: string = '';
  @Input() placeholder: string = '';
  @Input() isRequired: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() value: any = '';
  @Input() name: string = '';
  @Input() error: string = '';
  @Input() loading: boolean = false;
  @Output() valueChange = new EventEmitter<any>();
  @Output() cityChange = new EventEmitter<any>();

  constructor() {}
  ngOnInit(): void {
    const input = document.getElementById("input-cities") as HTMLInputElement;
    const autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete?.getPlace();
      this.cityChange.emit({
        location: place.formatted_address,
        lat: place?.geometry?.location.lat(),
        lng: place?.geometry?.location.lng(),
      });
    })
  }

  emitEvent() {
    this.valueChange.emit(this.value || '');
    this.cityChange.emit({
      location: '',
      lat: null,
      lng: null,
    });
  }


}
