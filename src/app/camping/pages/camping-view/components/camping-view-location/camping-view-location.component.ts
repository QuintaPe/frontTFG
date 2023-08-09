import { Input, Component, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';

@Component({
  selector: 'app-camping-view-location',
  templateUrl: './camping-view-location.component.html',
  styleUrls: ['./camping-view-location.component.scss'],
})
export class CampingViewLocationComponent {
  @Input() name?: string = '';
  @Input() location!: any;

  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPosition!: google.maps.LatLngLiteral;
  options!: google.maps.MapOptions;

  protected street: string;
  protected city: string;

  async ngOnInit(): Promise<void> {
    console.log(this.location);
    const { street, streetNumber, city, community, coords, country, locality, postalCode } = this.location;
    const coord = {
      lat: coords?.coordinates[0] || 0,
      lng: coords?.coordinates[1] || 0,
    };
    this.options = { center: coord, zoom: 16 };
    this.markerPosition = coord;

    this.street = `${street} ${streetNumber}, ${locality} (${postalCode})`;
    this.city = `${city}, ${community}, ${country}`
  }

  openInfoWindow(marker: MapMarker) {
    this.infoWindow.open(marker);
  }
}
