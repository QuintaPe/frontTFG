import { AfterViewInit, Component, ElementRef, Input, ViewChild, OnDestroy } from '@angular/core';
import { Camping } from '@models/camping';
import { GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-create-camping-location',
  templateUrl: './create-camping-location.component.html',
  styleUrls: ['../../create-camping.component.scss']
})

export class CreateCampingLocationComponent implements AfterViewInit, OnDestroy {
  @Input() camping !: Camping;
  @ViewChild('mapSearchField') searchField !: ElementRef;
  @ViewChild(GoogleMap) map !: GoogleMap;

  mapConfigurations= { disableDefaultUI: true };

  geocoder = new google.maps.Geocoder;
  center: google.maps.LatLngLiteral = { lat: 40.416775, lng: -3.703339 };

  ngAfterViewInit(): void {
    if (this.camping.location.coords.coordinates[0]) {
      this.center = {
        lat: this.camping.location.coords.coordinates[0],
        lng: this.camping.location.coords.coordinates[1],
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
          this.camping.location.coords.coordinates = [latLng.lat(), latLng.lng()];
        } else {
          window.alert('No hay resultados');
        }
      }
    });
  }

  fillCampingLocation(results: any) {
    Object.keys(this.camping.location).forEach(key => {
      if (key !== 'coords') {
        this.camping.location[key] = '';
      }
    });
    results.forEach((result: any) => {
      result.address_components.forEach((address: any) => {
        if (!this.camping.location.country && address.types.includes('country')) {
          this.camping.location.country = address.long_name;
        } else if (!this.camping.location.community && address.types.includes('administrative_area_level_1')) {
          this.camping.location.community = address.long_name;
        } else if (!this.camping.location.city && address.types.includes('administrative_area_level_2')) {
          this.camping.location.city = address.long_name;
        } else if (!this.camping.location.locality && address.types.includes('locality')) {
          this.camping.location.locality = address.long_name;
        } else if (!this.camping.location.street && address.types.includes('route')) {
          this.camping.location.street = address.short_name;
        } else if (!this.camping.location.streetNumber && address.types.includes('street_number')) {
          this.camping.location.streetNumber = address.short_name;
        } else if (!this.camping.location.postalCode && address.types.includes('postal_code')) {
          this.camping.location.postalCode = address.short_name;
        }
      })

      if (Object.keys(this.camping.location).every(key => this.camping.location[key])) {
        return;
      }
    })
  }

  getLatLang() {
    const [lat, lng] = this.camping.location.coords.coordinates
    return new google.maps.LatLng(+lat, +lng);
  }
}
