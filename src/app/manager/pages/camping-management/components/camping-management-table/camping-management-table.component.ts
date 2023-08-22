import { Component, Input, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { daysBetweenDates, formatDate, formatNumber, getFullName } from '@utils/functions';
import { CampingService } from '@app/camping/services/camping.service';
import { DialogService } from '@app/shared/components/dialog/dialog.service';
import { PopupService } from '@app/shared/components/popup/popup.service';
import { User } from '@app/core/models/user';
import { ConversationService } from '@app/core/services/conversation.service';
import { Router } from '@angular/router';
import { MANAGER_ROUTES } from '@app/core/routes';

@Component({
  selector: 'app-camping-management-table',
  templateUrl: './camping-management-table.component.html',
  styleUrls: ['./camping-management-table.component.scss']
})
export class CampingManagementTableComponent implements OnInit {
  @Input() id: string = '';
  tableFlagRefresh: number = 0;

  private campingService = inject(CampingService);
  private translate = inject(TranslateService);
  private dialogService = inject(DialogService);
  private popupService = inject(PopupService);
  private conversationService = inject(ConversationService);
  private router = inject(Router);

  protected actualBooking: any = null;
  protected columns:any;

  protected formatDate = formatDate;
  protected daysBetweenDates = daysBetweenDates;
  protected getFullName = getFullName;

  @ViewChild('popupInfoTemplate') popupInfoTemplate!: TemplateRef<any>;

  setColumns = () => {
    this.columns = [
      {
        field: 'user',
        type: 'avatar',
        width: 35,
        fieldName: (row: any) => getFullName(row.user.attributes),
        preRender: (user: User) => user.attributes?.avatar?._id,
      },
      {
        field: 'user',
        name: this.translate.instant('user.roles.user'),
        sort: 'asc',
        sortable: true,
        preRender: (user: User) => getFullName(user.attributes),
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
            icon: 'check_circle',
            text: this.translate.instant('campsite.acceptBooking'),
            onClick: (id: string) => this.changeBookingStatus(id, 'accepted'),
            hidden: (row: any) => row.status !== 'pending',
          },
          {
            icon: 'cancel',
            text: this.translate.instant('campsite.rejectBooking'),
            onClick: (id: string) => this.changeBookingStatus(id, 'rejected'),
            hidden: (row: any) => row.status !== 'pending',
          },
          {
            icon: 'cancel',
            text: this.translate.instant('campsite.cancelBooking'),
            onClick: (id: string) => this.changeBookingStatus(id, 'cancelled'),
            hidden: (row: any) => row.status !== 'accepted',
          },
          {
            icon: 'chat_bubble_outline',
            text: this.translate.instant('internalMail.internalMail'),
            onClick: (_:any, row:any) => this.openChat(row),
          },
        ],
      },
    ];
  }


  ngOnInit(): void {
    this.setColumns();
    this.translate.onLangChange.subscribe(() => this.setColumns());
  }

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

  showBookInfo = (id: string, row: any) => {
    this.actualBooking = row;
    const title = this.translate.instant('campsite.viewBooking')
    this.popupService.open(title, this.popupInfoTemplate);
  }

  changeBookingStatus = async (id: string, status: string) => {
    let type = '';
    let message = '';

    switch (status) {
      case 'accepted':
        type = 'confirm',
        message = 'campsite.confirmAcceptBooking'
        break;
      case 'rejected':
        type = 'confirmDanger',
        message = 'campsite.confirmRejectBooking'
        break;
      case 'cancelled':
        type = 'confirmDanger',
        message = 'campsite.confirmCancelBooking'
        break;
    }
    const confirmed = await this.dialogService.open(type, this.translate.instant(message));
    if (confirmed) {
      const ref = this.dialogService.openLoading();
      try {
        await this.campingService.changeBookingStatus(this.id, id, status);
        ref.close();
        this.tableFlagRefresh += 1;
      } catch (err) {
        await this.dialogService.open('danger', 'Error');
        ref.close();
      }
    }
  }

  openChat = async (row: any) => {
    const ref = this.dialogService.openLoading();

    try {
      const conversation = await this.conversationService.createConversation('User', row.user.id, this.id);
      this.router.navigateByUrl(MANAGER_ROUTES.setConversation(conversation._id));
    } catch (err) {
      await this.dialogService.open('danger', 'Error');
    }

    ref.close();
  }
}
