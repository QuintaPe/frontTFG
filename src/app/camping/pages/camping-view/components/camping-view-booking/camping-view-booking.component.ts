import { Input, Component, inject, ChangeDetectorRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';
import { BookingService } from '@app/camping/services/booking.service';
import { CampingService } from '@app/camping/services/camping.service';
import { AUTH_ROUTES, CAMPINGS_ROUTES } from '@app/core/routes';
import { InputSelectComponent } from '@app/shared/components/inputs/input-select/input-select.component';
import { TranslateService } from '@ngx-translate/core';
import {
  convertArrayToObject,
  daysBetweenDates,
  formatDate,
  formatNumber,
  isEmptyObject,
} from '@utils/functions';

@Component({
  selector: 'app-camping-view-booking',
  templateUrl: './camping-view-booking.component.html',
  styleUrls: ['./camping-view-booking.component.scss'],
})
export class CampingViewBookingComponent implements OnInit {
  @Input() camping: string = '';
  @Input() entryDate: Date | null = null;
  @Input() exitDate: Date | null = null;

  lodgings: { [key: string]: any } = {};

  auxEntryDate?: Date;
  auxExitDate?: Date;
  tableFlagRefresh = 0;
  showOnlyAvailables: boolean = false;
  lodgingsColumns: any;
  availableColumns: any;


  lodgingsToBook: { [key: string]: number } = {};

  private translate = inject(TranslateService);
  private cd = inject(ChangeDetectorRef);
  private router = inject(Router);
  private campingService = inject(CampingService);
  private bookingService = inject(BookingService);
  protected authService = inject(AuthService);
  isEmptyObject = isEmptyObject;
  formatDate = formatDate;

  setColumns = () => {
    this.lodgingsColumns = [
      {
        field: 'name',
        name: this.translate.instant('campsite.lodging'),
        sort: 'asc',
        sortable: true,
      },
      {
        field: 'capacity',
        name: this.translate.instant('campsite.capacity'),
        sort: 'asc',
        sortable: true,
        preRender: (cap: string) => cap,
      },
    ];

    this.availableColumns = [
      ...this.lodgingsColumns,
      {
        name: '',
        type: 'component',
        component: InputSelectComponent,
        componentInputs: (row: any) => ({
          value: this.lodgingsToBook[row.id],
          options: Array.from({ length: row.availables + 1 }, (_, i) => ({
            id: i,
            name: i || '-',
          })),
        }),
        componentOutputs: (row: any) => ({
          valueChange: (v: any) => {
            if (v) {
              this.lodgingsToBook[row.id] = v
            } else {
              delete this.lodgingsToBook[row.id];
            }
          },
        }),
      },
    ];
  };

  ngOnInit(): void {
    this.auxEntryDate = this.entryDate;
    this.auxExitDate = this.exitDate;
    this.setColumns();
    this.translate.onLangChange.subscribe(() => this.setColumns());
  }

  refreshTable = () => {
    this.tableFlagRefresh += 1;
    this.cd.detectChanges();
  };

  handleDateChange(dates: any) {
    this.auxEntryDate = dates.start;
    this.auxExitDate = dates.end;
  }

  getAvailableLodgings = async (
    page: number,
    size: number,
    search: string,
    filters: any,
    sort: string
  ) => {
    if (this.auxExitDate && this.auxExitDate) {
      this.entryDate = this.auxEntryDate;
      this.exitDate = this.auxExitDate;
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

    if (this.authService.user) {
      this.router.navigateByUrl(CAMPINGS_ROUTES.setBookCamping(this.camping));
    } else {
      this.router.navigateByUrl(AUTH_ROUTES.LOGIN.url + `?redirectTo=${CAMPINGS_ROUTES.setBookCamping(this.camping)}`);
    }
  }
}
