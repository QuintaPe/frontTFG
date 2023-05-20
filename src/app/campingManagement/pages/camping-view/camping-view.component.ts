import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { formatDate } from '@utils/functions';
import { CampingService } from '@app/camping/services/camping.service';
import { DialogService } from '@app/shared/components/dialog/dialog.service';

@Component({
  selector: 'app-camping-view',
  templateUrl: './camping-view.component.html',
  styleUrls: ['./camping-view.component.scss']
})
export class CampingViewComponent implements OnInit {
  id!: string;
  tableFlagRefresh: number = 0;

  private activatedRoute = inject(ActivatedRoute);
  private campingService = inject(CampingService);
  private translate = inject(TranslateService);
  private dialogService = inject(DialogService);

  columns: Object[] = [
    {
      field: 'user',
      name: this.translate.instant('user.user'),
      sort: 'asc',
      sortable: true,
      preRender: (user: any) => `${user.attributes.firstname} ${user.attributes.lastname}`,
      width: 300,
    },
    {
      field: 'units',
      name: this.translate.instant('camping.units'),
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
          text: 'Edit',
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

  async ngOnInit(): Promise<void> {
    this.id = this.activatedRoute.snapshot.paramMap.get("id") ?? '';
  }

  fetchCampingBookings = async (page: number, size: number, search: string, filters: any, sort: string) => {
    return this.campingService.getCampingBookings(this.id, page, size, search, filters, sort)
  }

  async handleDeleteBooking(booking: string) {
    const confirmed = await this.dialogService.openConfirm(this.translate.instant('camping.confirmDeleteBooking'));
    if (confirmed) {
      try {
        const ref = this.dialogService.openLoading();
        await this.campingService.deleteCampingBooking(this.id, booking);
        ref.close();
        this.tableFlagRefresh += 1;
      } catch (err) {}
    }
  }

}
