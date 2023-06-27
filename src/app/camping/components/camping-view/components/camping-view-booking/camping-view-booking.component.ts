import { Input, Component, inject, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from '@app/camping/services/booking.service';
import { CampingService } from '@app/camping/services/camping.service';
import { CAMPINGS_ROUTES } from '@app/core/routes';
import { InputSelectComponent } from '@app/shared/components/inputs/input-select/input-select.component';
import { TranslateService } from '@ngx-translate/core';
import {
  convertArrayToObject,
  daysBetweenDates,
  formatNumber,
  isEmptyObject,
} from '@utils/functions';

@Component({
  selector: 'app-camping-view-booking',
  templateUrl: './camping-view-booking.component.html',
  styleUrls: ['./camping-view-booking.component.scss'],
})
export class CampingViewBookingComponent {
  @Input() camping: string = '';
  lodgings: { [key: string]: any } = {};

  entryDate?: Date;
  exitDate?: Date;
  tableFlagRefresh = 0;
  showOnlyAvailables: boolean = false;

  lodgingsToBook: { [key: string]: number } = {};

  private translate = inject(TranslateService);
  private cd = inject(ChangeDetectorRef);
  private router = inject(Router);
  private campingService = inject(CampingService);
  private bookingService = inject(BookingService);
  isEmptyObject = isEmptyObject;

  lodgingsColumns: any = [
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
  ];

  availableColumns = [
    ...this.lodgingsColumns,
    {
      name: '',
      type: 'component',
      component: InputSelectComponent,
      componentInputs: (row: any) => ({
        value: this.lodgingsToBook[row.id],
        options: Array.from({ length: row.availables }, (_, i) => ({
          id: i + 1,
          name: i + 1,
        })),
      }),
      componentOutputs: (row: any) => ({
        valueChange: (v: any) => (this.lodgingsToBook[row.id] = v),
      }),
    },
  ];

  refreshTable = () => {
    this.tableFlagRefresh += 1;
    this.cd.detectChanges();
  };

  getAvailableLodgings = async (
    page: number,
    size: number,
    search: string,
    filters: any,
    sort: string
  ) => {
    if (this.entryDate && this.exitDate) {
      this.showOnlyAvailables = true;
      const auxLodgings = await this.campingService.getAvailableLodgings(
        this.camping, this.entryDate, this.exitDate, {
          page, size, search, filters, sort,
        }
      );
      this.lodgings = convertArrayToObject(auxLodgings.items);
      return auxLodgings;
    }
    this.showOnlyAvailables = false;
    return this.campingService.getCampingLodgings(this.camping);
  };

  getTotalFee(id: string | null = null) {
    if (this.exitDate && this.entryDate) {
      if (id) {
        const fee =
          this.lodgingsToBook[id] *
          daysBetweenDates(this.exitDate, this.entryDate) *
          this.lodgings[id].feePerNight;
        return formatNumber(fee, { decimals: 2, currency: '€' });
      }
      const num = Object.keys(this.lodgingsToBook).reduce((prev, curr) => {
        return (
          prev +
          this.lodgingsToBook[curr] *
            daysBetweenDates(this.exitDate, this.entryDate) *
            this.lodgings[curr].feePerNight
        );
      }, 0);
      return formatNumber(num, { decimals: 2, currency: '€' });
    }
    return 0;
  }

  get selectedDays() {
    return daysBetweenDates(this.exitDate, this.entryDate);
  }

  redirectBookingForm() {
    this.bookingService.setBookingData({
      camping: this.camping,
      lodgings: this.lodgingsToBook,
      entryDate: this.entryDate,
      exitDate: this.exitDate,
    });

    this.router.navigateByUrl(CAMPINGS_ROUTES.setBookCamping(this.camping));
  }
}
