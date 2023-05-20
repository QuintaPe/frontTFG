import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CampingService } from '@app/camping/services/camping.service';
import { Camping } from '@models/camping';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { CampingLodging } from '@app/core/models/campingLodging';
import { BookingService } from '@app/core/services/booking.service';
import { TranslateService } from '@ngx-translate/core';
import environment from 'src/environments/environment';
import { InputSelectComponent } from '@app/shared/components/inputs/input-select/input-select.component';

@Component({
  selector: 'app-camping-view',
  templateUrl: './camping-view.component.html',
  styleUrls: ['./camping-view.component.scss']
})
export class CampingViewComponent implements OnInit {
  camping: Camping | null = null;
  lodgings: CampingLodging[] = [];
  loading: boolean = true;

  startDate:Date | null = null;
  endDate:Date | null = null;
  tableFlagRefresh = 0;

  lodgingsToBook: { [key: string]: number } = {};

  private activatedRoute = inject(ActivatedRoute);
  private campingService = inject(CampingService);
  private bookingService = inject(BookingService);
  private translate = inject(TranslateService);

  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  markerOptions: google.maps.MarkerOptions =  {draggable: false };
  markerPosition!: google.maps.LatLngLiteral;
  options!: google.maps.MapOptions;

  lodgingsColumns = [
      {
        field: 'name',
        name: this.translate.instant('camping.lodging'),
        sort: 'asc',
        sortable: true,
      },
      {
        field: 'capacity',
        name: this.translate.instant('camping.capacity'),
        sort: 'asc',
        sortable: true,
        preRender: (cap: string) => cap,
      },
      {
        name: '',
        type: 'component',
        component: InputSelectComponent,
        componentProps: (row: any) => ({
          value: this.lodgingsToBook[row.id],
          onChange: (v: string) => console.log(v),
          options: Array.from({ length: row.availables }, (_, i) => ({ id: i, name: i })),
        })
      }
    ]

  async ngOnInit(): Promise<void> {
    const id = this.activatedRoute.snapshot.paramMap.get("id") ?? '';
    this.camping = await this.campingService.getCamping(id);
    const coord = {
      lat: this.camping?.location.coords.coordinates[0] || 0,
      lng: this.camping?.location.coords.coordinates[1] || 0,
    };
    this.options = { center: coord, zoom: 16 };
    this.markerPosition = coord;
    this.loading = false;
  }

  getImageUrl = (image: any) => {
    return image ? environment.api.FILES_BASE_URL + image._id : null
  }

  openInfoWindow(marker: MapMarker) {
    this.infoWindow.open(marker);
  }

  scrollToElement(element: any): void {
    element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  refreshTable = () => {
    this.tableFlagRefresh += 1;
  }

  getAvailableLodgings = async (page: number, size: number, search: string, filters: any, sort: string) => {
    if (this.camping) {
      return this.startDate && this.endDate
        ? this.bookingService.getAvailableLodgings(this.camping._id, this.startDate, this.endDate, page, size, search, filters, sort)
        : this.campingService.getCampingLodgings(this.camping._id);
    }
  }
}
