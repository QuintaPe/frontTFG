import {
  Input,
  Component,
  ViewChild,
} from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';


@Component({
  selector: 'app-camping-view-location',
  templateUrl: './camping-view-location.component.html',
  styleUrls: ['./camping-view-location.component.scss'],
})
export class CampingViewLocationComponent {
  @Input() name?: string = "";
  @Input() coords?: any = {};

  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPosition!: google.maps.LatLngLiteral;
  options!: google.maps.MapOptions;

  async ngOnInit(): Promise<void> {
    const coord = {
      lat: this.coords?.coordinates[0] || 0,
      lng: this.coords?.coordinates[1] || 0,
    };
    this.options = { center: coord, zoom: 16 };
    this.markerPosition = coord;
  }

  openInfoWindow(marker: MapMarker) {
    this.infoWindow.open(marker);
  }
}
