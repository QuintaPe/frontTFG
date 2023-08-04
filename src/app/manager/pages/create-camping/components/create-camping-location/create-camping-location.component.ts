import { AfterViewInit, Component, ElementRef, Input, ViewChild, OnDestroy, inject, ChangeDetectorRef } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import {  FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-camping-location',
  templateUrl: './create-camping-location.component.html',
  styleUrls: ['../../create-camping.component.scss']
})

export class CreateCampingLocationComponent implements AfterViewInit, OnDestroy {
  @Input() formGroup!: FormGroup;
  @ViewChild('mapSearchField') searchField !: ElementRef;
  @ViewChild(GoogleMap) map !: GoogleMap;

  mapConfigurations= { disableDefaultUI: true };

  geocoder = new google.maps.Geocoder;
  center: google.maps.LatLngLiteral = { lat: 40.416775, lng: -3.703339 };
  latLang: google.maps.LatLng;

  private cdr = inject(ChangeDetectorRef);

  ngAfterViewInit(): void {
    const coordinates = this.formGroup.get('coords').value.coordinates;
    if (coordinates.length) {
      this.latLang = new google.maps.LatLng(coordinates[0], coordinates[1]);
      this.center = {
        lat: coordinates[0],
        lng: coordinates[1],
      };
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    }

    const searchBox = new google.maps.places.SearchBox(
      this.searchField.nativeElement,
    );

    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(
      this.searchField.nativeElement,
    )

    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces();
      if(!places?.length) {
        return;
      }
      const bounds = new google.maps.LatLngBounds();
      places.forEach(place => {
        if(!place.geometry?.location) {
          return;
        }
        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
        this.map.fitBounds(bounds);
      })
    })

    this.map.googleMap?.addListener('click', (event: any) => {
      this.addMarker(event.latLng);
    });

    this.formGroup.get('coords').valueChanges.subscribe((coords) => {
      if (coords.coordinates) {
        this.latLang = new google.maps.LatLng(coords.coordinates[0], coords.coordinates[1]);
        this.cdr.detectChanges();
      }
    });
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    const pacContainers = document.querySelectorAll('.pac-container');
    pacContainers.forEach(container => container.remove());
  }

  addMarker(latLng: google.maps.LatLng) {
    this.geocoder.geocode({ 'location': latLng }, (results, status) => {
      if (results && status === google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          this.fillCampingLocation(results);
          this.formGroup?.controls?.['coords'].setValue({ type: 'Point', coordinates: [latLng.lat(), latLng.lng()]});
        } else {
          window.alert('No hay resultados');
        }
      }
    });
  }

  fillCampingLocation(results: any) {
    const locationKeys = Object.keys(this.formGroup.controls);
    locationKeys.forEach(key => {
      if (key !== 'coordinates') {
        this.formGroup.get(key)?.setValue('');
      }
    });

    results.forEach((result: any) => {
      result.address_components.forEach((address: any) => {
        if (!this.formGroup.get('country')?.value && address.types.includes('country')) {
          this.formGroup.get('country')?.setValue(address.long_name);
        } else if (!this.formGroup.get('community')?.value && address.types.includes('administrative_area_level_1')) {
          this.formGroup.get('community')?.setValue(address.long_name);
        } else if (!this.formGroup.get('city')?.value && address.types.includes('administrative_area_level_2')) {
          this.formGroup.get('city')?.setValue(address.long_name);
        } else if (!this.formGroup.get('locality')?.value && address.types.includes('locality')) {
          this.formGroup.get('locality')?.setValue(address.long_name);
        } else if (!this.formGroup.get('street')?.value && address.types.includes('route')) {
          this.formGroup.get('street')?.setValue(address.short_name);
        } else if (!this.formGroup.get('streetNumber')?.value && address.types.includes('street_number')) {
          this.formGroup.get('streetNumber')?.setValue(address.short_name);
        } else if (!this.formGroup.get('postalCode')?.value && address.types.includes('postal_code')) {
          this.formGroup.get('postalCode')?.setValue(address.short_name);
        }
      });

      if (locationKeys.every(key => this.formGroup.get(key)?.value)) {
        return;
      }
    });
  }
}
