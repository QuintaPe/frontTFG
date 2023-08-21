import { Component, inject, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from '@app/core/models/user';
import { ADMIN_ROUTES } from '@app/core/routes';
import { ConversationService } from '@app/core/services/conversation.service';
import { DialogService } from '@app/shared/components/dialog/dialog.service';
import { PopupComponent } from '@app/shared/components/popup/popup.component';
import { UserService } from '@app/user/services/user.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss'],
})

export class AdminUsersComponent implements OnInit {
  tableFlagRefresh = 0;
  editUser!: User;
  columns: any;

  private userService = inject(UserService);
  private conversationService = inject(ConversationService);
  private translate = inject(TranslateService);
  private dialogService = inject(DialogService);
  protected dialog = inject(MatDialog);
  public dialogRef: MatDialogRef<PopupComponent>;
  private router = inject(Router);

  @ViewChild('editUserTemplate') editUserTemplate!: TemplateRef<any>;

  setColumns = () => {
    this.columns = [
      {
        field: 'attributes',
        type: 'avatar',
        width: '44',
        fieldName: (row: any) => row.attributes.firstname,
        preRender: (v: any) => v.avatar?._id,
      },
      {
        field: 'attributes',
        name: 'Nombre',
        type: 'html',
        preRender: (v: any, row: any) => `
          <div>${v.firstname} ${v.lastname}</div>
          <div class='fs-sm fc-secondary'>${row.email}</div>
        `,
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
            icon: 'edit',
            text: this.translate.instant('common.edit'),
            onClick: (id: string, row: any) => this.openEditPopup(row),
          },
          {
            icon: 'delete_outline',
            text: this.translate.instant('common.delete'),
            onClick: (id: string) => this.handleDeleteUser(id),
          },
          {
            icon: 'chat_bubble_outline',
            text: this.translate.instant('internalMail.internalMail'),
            onClick: (id: string) => this.openChat(id),
            hidden: (row: any) => row.role === 'admin'
          },
        ],
      },
    ];
  };

  ngOnInit(): void {
    this.setColumns();
    this.translate.onLangChange.subscribe(() => this.setColumns());
  }

  handleDeleteUser = async (id: string) => {
    const confirmed = await this.dialogService.open(
      'confirmDanger', 'Estas seguro?'
    );
    if (confirmed) {
      const ref = this.dialogService.openLoading();
      try {
        await this.userService.deleteUser(id);
        ref.close();
        this.tableFlagRefresh += 1;
      } catch (err) {
        ref.close();
        await this.dialogService.open('danger', 'Error');
      }
    }
  };

  getUsers = (page: any, size: any, search: any, filters: any, sort: any) => {
    return this.userService.getUsers({ page, size, search, filters, sort });
  };

  openEditPopup(user: User) {
    this.editUser = user;
    this.dialogRef = this.dialog.open(PopupComponent, {
      data: {
        headerText: this.translate.instant('campsite.addLodging'),
        template: this.editUserTemplate,
      },
      width: '80vw',
    });
  }

  onUserEdited() {
    this.dialogRef.close();
    this.tableFlagRefresh += 1;
  }

  openChat = async (id: string) => {
    const ref = this.dialogService.openLoading();

    try {
      const conversation = await this.conversationService.createConversation('User', id);
      this.router.navigateByUrl(ADMIN_ROUTES.setConversation(conversation._id));
    } catch (err) {
      await this.dialogService.open('danger', 'Error');
    }

    ref.close();
  }
}
