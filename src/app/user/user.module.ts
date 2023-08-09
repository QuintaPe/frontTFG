import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { EditAccountComponent } from './pages/edit-account/edit-account.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatIconModule } from '@angular/material/icon';
import { UserRoutingModule } from './user-routing.module';
import { PanelComponent } from '@shared/components/panel/panel.component';
import { CommonModule } from '@angular/common';
import { InputAvatarComponent } from '@shared/components/inputs/input-avatar/input-avatar.component';
import { InputTextComponent } from '@shared/components/inputs/input-text/input-text.component';
import { InputSelectComponent } from '@shared/components/inputs/input-select/input-select.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { UserBookingsComponent } from './pages/user-bookings/user-bookings.component';
import { TableComponent } from '@app/shared/components/table/table.component';
import { ProfileComponent } from '@app/shared/components/Profile/profile.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CampingRowComponent } from '@app/camping/components/campings-list/components/camping-row/camping-row.component';
import { DialogService } from '@app/shared/components/dialog/dialog.service';
import { InputStarsComponent } from '@app/shared/components/inputs/input-stars/input-stars.component';
import { InputTextAreaComponent } from '@app/shared/components/inputs/input-text-area/input-text-area.component';


@NgModule({
  declarations: [
    EditAccountComponent,
    UserBookingsComponent,
  ],
  imports: [
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    OverlayModule,
    MatIconModule,
    MatDialogModule,

    CommonModule,
    PanelComponent,
    InputAvatarComponent,
    InputTextComponent,
    InputSelectComponent,
    ButtonComponent,
    TableComponent,
    ProfileComponent,
    CampingRowComponent,
    InputStarsComponent,
    InputTextAreaComponent
  ],
  providers: [DialogService],
})
export class UserModule { }
