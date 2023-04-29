import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CampingService } from '@app/user/services/camping.service';
import { Camping } from '@models/camping';
import {MapInfoWindow, MapMarker} from '@angular/google-maps';
import enviroment from 'src/environments/environment';


@Component({
  selector: 'app-camping-view',
  templateUrl: './camping-view.component.html',
  styleUrls: ['./camping-view.component.scss']
})
export class CampingViewComponent implements OnInit {
  camping: Camping | null = null;
  loading: boolean = true;
  // apiLoaded!: Observable<boolean>;

  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

  constructor(
    private activatedroute: ActivatedRoute,
    private campingService: CampingService,
    // private apiService: ApiService,
  ) {}

  options: google.maps.MapOptions = {
    center: {lat: 36.7846086, lng: -4.1046066},
    zoom: 16
  };
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPosition: google.maps.LatLngLiteral = {lat: 36.7846086, lng: -4.1046066};

  async ngOnInit(): Promise<void> {
    const id = this.activatedroute.snapshot.paramMap.get("id") ?? '';
    this.camping = await this.campingService.getCamping(id);
    this.loading = false;
    console.log(this.camping);
    // this.apiLoaded = await this.apiService.fetch('GET', 'https://maps.googleapis.com/maps/api/js', { key: 'AIzaSyA5cAYLybDKAeSwXSHNBVNznGRv4guVQf8'})
  }

  getImageUrl = () => {
    return this.camping?.images[0]
      ? enviroment.api.FILES_BASE_URL + this.camping.images[0]?._id
      : null
  }

  openInfoWindow(marker: MapMarker) {
    this.infoWindow.open(marker);
  }
}
