import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CampingService } from '@app/camping/services/camping.service';
import { ADMIN_ROUTES } from '@app/core/routes';
import { ConversationService } from '@app/core/services/conversation.service';
import { DialogService } from '@app/shared/components/dialog/dialog.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-admin-campings',
  templateUrl: './admin-campings.component.html',
  styleUrls: ['./admin-campings.component.scss']
})

export class AdminCampingsComponent {
  private campingService = inject(CampingService);
  private conversationService = inject(ConversationService);
  private dialogService = inject(DialogService);
  private translate = inject(TranslateService);
  private router = inject(Router);

  protected columns: any;

  setColumns = () => {
    this.columns = [
      {
        field: 'name',
        name: this.translate.instant('common.name'),
      },
      {
        field: 'role',
        name: this.translate.instant('user.role'),
        type: 'html',
        width: '100',
        preRender: (v: string) => this.translate.instant(`user.roles.${v}`),
      },
      {
        field: 'id',
        type: 'menu',
        width: '40',
        buttons: [
          {
            icon: 'chat_bubble',
            text: this.translate.instant('internalMail.chat'),
            onClick: (id: string) => this.openChat(id),
          },
        ],
      },
    ];
  };

  ngOnInit(): void {
    this.setColumns();
    this.translate.onLangChange.subscribe(() => this.setColumns());
  }

  getCampings = async (page:any, size:any, search:any, filters:any, sort:any) => {
    return await this.campingService.getOwnCampings({ page, size, search, filters, sort })
  }

  openChat = async (id: string) => {
    const ref = this.dialogService.openLoading();

    try {
      const conversation = await this.conversationService.createConversation('Camping', id);
      this.router.navigateByUrl(ADMIN_ROUTES.setConversation(conversation._id));
    } catch (err) {
      await this.dialogService.open('danger', 'Error');
    }

    ref.close();
  }

}
