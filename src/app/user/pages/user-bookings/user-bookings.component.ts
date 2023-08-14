import { Component, OnInit, inject, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '@app/auth/services/auth.service';
import { CampingService } from '@app/camping/services/camping.service';
import { Camping } from '@app/core/models/camping';
import { DialogService } from '@app/shared/components/dialog/dialog.service';
import { PopupComponent } from '@app/shared/components/popup/popup.component';
import { UserService } from '@app/user/services/user.service';
import { TranslateService } from '@ngx-translate/core';
import { daysBetweenDates, formatDate, formatNumber } from '@utils/functions';

@Component({
  selector: 'app-user-bookings',
  templateUrl: './user-bookings.component.html',
  styleUrls: ['./user-bookings.component.scss']
})

export class UserBookingsComponent implements OnInit {
  protected columns:any = []
  protected translate = inject(TranslateService);
  protected userService = inject(UserService);
  protected authService = inject(AuthService);
  protected dialog = inject(MatDialog);
  private dialogService = inject(DialogService);
  protected campingService = inject(CampingService);

  protected actualBooking: any = null;
  protected formatDate = formatDate;
  protected daysBetweenDates = daysBetweenDates;

  protected rating = 0;
  protected review = '';
  protected popupRef: any;
  protected loading = false;
  protected tableFlagRefresh: number = 0;

  @ViewChild('popupInfoTemplate') popupInfoTemplate!: TemplateRef<any>;
  @ViewChild('popupRatingTemplate') popupRatingTemplate!: TemplateRef<any>;

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
          {
            icon: 'cancel',
            text: this.translate.instant('campsite.cancelBooking'),
            onClick: this.cancelBooking,
            hidden: (row: any) => row.status === 'cancelled'
          },
          {
            icon: 'star_outline',
            text: (row: any) => this.translate.instant(row?.relation?.review ? 'campsite.yourReview' : 'campsite.addReview'),
            onClick: this.ratingCamping,
            hidden: (row: any) => !row.relation?.review && daysBetweenDates(row.entryDate, row.exitDate) > 7
          },
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

  cancelBooking = async (id: string, row: any) => {
    const confirmed = await this.dialogService.open('confirmDanger', this.translate.instant('campsite.confirmCancelBooking'));
    if (confirmed) {
      const ref = this.dialogService.openLoading();
      try {
        await this.campingService.changeBookingStatus(row.camping._id, id, 'cancelled');
        ref.close();
        this.tableFlagRefresh += 1;
      } catch (err) {
        ref.close();
      }
    }
  }

  ratingCamping = (id: string, row: any) => {
    this.actualBooking = row;
    this.rating = row.relation?.review?.rating || 1;
    this.review = row.relation?.review?.review || '';
    this.popupRef = this.dialog.open(PopupComponent, {
      data: {
        headerText: this.translate.instant(row?.relation?.review ? 'campsite.yourReview' : 'campsite.addReview'),
        template: this.popupRatingTemplate,
      },
      width: '80vw',
    });
  }

  async sendReview() {
    this.loading = true;
    await this.campingService.createCampingRelation(this.actualBooking.camping._id, {
      review: { rating: this.rating, review: this.review }
    });
    this.loading = false;
    this.popupRef.close();
  }
}

