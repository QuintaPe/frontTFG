import { Component, inject, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { User } from '@app/core/models/user';
import { DialogService } from '@app/shared/components/dialog/dialog.service';
import { PopupComponent } from '@app/shared/components/popup/popup.component';
import { UserService } from '@app/user/services/user.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})

export class AdminUsersComponent {
  tableFlagRefresh = 0;
  editUser!: User;

  private userService = inject(UserService);
  private translate = inject(TranslateService);
  private dialogService = inject(DialogService);
  protected dialog = inject(MatDialog);
  public dialogRef: MatDialogRef<PopupComponent>;

  @ViewChild('editUserTemplate') editUserTemplate!: TemplateRef<any>;

  columns = [
    {
      field: 'attributes',
      type: 'avatar',
      width: '45',
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
          icon: 'pencil',
          text: this.translate.instant('common.edit'),
          onClick: (id: string, row: any) => this.openEditPopup(row),
        },
        {
          icon: 'trash',
          text: this.translate.instant('common.delete'),
          onClick: (id: string) => this.handleDeleteUser(id),
        }
    ],
    },
  ];

  handleDeleteUser = async (id: string) => {
    const ref = this.dialogService.openLoading();
      try {
        await this.userService.deleteUser(id);
        ref.close();
        this.tableFlagRefresh += 1;
      } catch (err) {
        ref.close();
      }

      return
  }


  getUsers = (page:any, size:any, search:any, filters:any, sort:any) => {
    return this.userService.getUsers({ page, size, search, filters, sort })
  }

  openEditPopup(user: User) {
    this.editUser = user;
    this.dialogRef = this.dialog.open(PopupComponent, {
      data: {
        headerText: this.translate.instant('camping.addLodging'),
        template: this.editUserTemplate
      },
      width: '80vw',
    });
  }

  onUserEdited() {
    this.dialogRef.close();
    this.tableFlagRefresh += 1;
  }

}
