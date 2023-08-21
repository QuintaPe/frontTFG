import { Component, OnInit, inject, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '@app/auth/services/auth.service';
import { Camping } from '@app/core/models/camping';
import { PopupComponent } from '@app/shared/components/popup/popup.component';
import { UserService } from '@app/user/services/user.service';
import { TranslateService } from '@ngx-translate/core';
import { daysBetweenDates, formatDate, formatNumber, getFullName } from '@utils/functions';

@Component({
  selector: 'app-admin-bookings',
  templateUrl: './admin-bookings.component.html',
  styleUrls: ['./admin-bookings.component.scss']
})

export class AdminBookingsComponent implements OnInit {
  protected columns:any = []
  protected translate = inject(TranslateService);
  protected userService = inject(UserService);
  protected authService = inject(AuthService);
  protected dialog = inject(MatDialog);
  protected actualBooking: any = null;
  @ViewChild('popupInfoTemplate') popupInfoTemplate!: TemplateRef<any>;

  protected formatDate = formatDate;
  protected daysBetweenDates = daysBetweenDates;
  protected getFullName = getFullName;

  setColumns = () => {
    this.columns = [
      {
        field: 'camping',
        name: this.translate.instant('campsite.lodging'),
        sort: 'asc',
        sortable: true,
        preRender: (camping: Camping) => camping.name,
      },
      {
        field: 'entryDate',
        name: this.translate.instant('campsite.entryDate'),
        sort: 'asc',
        sortable: true,
        preRender: (entryDate: Date) => formatDate(entryDate),
      },
      {
        field: 'exitDate',
        name: this.translate.instant('campsite.exitDate'),
        sort: 'asc',
        sortable: true,
        preRender: (exitDate: Date) => formatDate(exitDate),
      },
      {
        field: 'totalCost',
        name: this.translate.instant('campsite.price'),
        sort: 'asc',
        sortable: true,
        preRender: (price: number) => formatNumber(price, { currency: '€' }),
      },
      {
        field: 'status',
        name: this.translate.instant('campsite.status'),
        sort: 'asc',
        sortable: true,
        preRender: (status: string) => this.translate.instant('campsite.' + status),
      },
      {
        type: 'menu',
        width: 40,
        buttons: [
          {
            icon: 'remove_red_eye',
            text: this.translate.instant('common.view'),
            onClick: this.showBookInfo,
          },
          // {
          //   icon: 'cancel',
          //   text: this.translate.instant('campsite.cancelBooking'),
          //   onClick: this.cancelBooking,
          //   hidden: (row: any) => row.status === 'cancelled'
          // },
        ],
      },
    ];
  }

  ngOnInit(): void {
    this.setColumns();
    this.translate.onLangChange.subscribe(() => this.setColumns());
  }

  getUserBookings = async (
    page: number,
    size: number,
    search: string,
    filters: any,
    sort: string
  ) => {
    return this.userService.getUserBooking(this.authService.user._id, {
      page, size, search, filters, sort,
    })
  };

  showBookInfo = (id: string, row: any) => {
    this.actualBooking = row;
    this.dialog.open(PopupComponent, {
      data: {
        headerText: this.translate.instant('campsite.viewBooking'),
        template: this.popupInfoTemplate,
      },
      width: '80vw',
    });
  }
}
