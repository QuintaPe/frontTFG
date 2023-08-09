import { Component, Input, OnInit, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { formatDate } from '@utils/functions';
import { CampingService } from '@app/camping/services/camping.service';
import { DialogService } from '@app/shared/components/dialog/dialog.service';

@Component({
  selector: 'app-camping-view',
  templateUrl: './camping-view.component.html',
  styleUrls: ['./camping-view.component.scss']
})
export class CampingViewComponent {
  @Input() id: string = '';
  tableFlagRefresh: number = 0;

  private campingService = inject(CampingService);
  private translate = inject(TranslateService);
  private dialogService = inject(DialogService);

  columns: Object[] = [
    {
      field: 'user',
      name: this.translate.instant('user.roles.user'),
      sort: 'asc',
      sortable: true,
      preRender: (user: any) => `${user.attributes.firstname} ${user.attributes.lastname}`,
      width: 300,
    },
    {
      field: 'units',
      name: this.translate.instant('campsite.units'),
      sort: 'asc',
      sortable: true,
      preRender: (units: string) => units.length,
      width: 20,
    },
    {
      field: 'createdAt',
      name: this.translate.instant('common.creationDate'),
      sort: 'asc',
      sortable: true,
      preRender: (date: string) => formatDate(date),
      width: 160,
    },
    {
      type: 'menu',
      width: 40,
      buttons: [
        {
          icon: 'person_add',
          text: this.translate.instant('common.edit'),
          onClick: () => console.log('b'),
        },
        {
          icon: 'person_outline',
          text: this.translate.instant('common.delete'),
          onClick: (id: string) => this.handleDeleteBooking(id),
        }
    ],
    }
  ];

  fetchCampingBookings = async (page: number, size: number, search: string, filters: any, sort: string) => {
    return this.campingService.getCampingBookings(this.id, page, size, search, filters, sort)
  }

  async handleDeleteBooking(booking: string) {
    const confirmed = await this.dialogService.open('confirmDanger', this.translate.instant('campsite.confirmDeleteBooking'));
    if (confirmed) {
      const ref = this.dialogService.openLoading();
      try {
        await this.campingService.deleteCampingBooking(this.id, booking);
        ref.close();
        this.tableFlagRefresh += 1;
      } catch (err) {
        ref.close();
      }
    }
  }

}
