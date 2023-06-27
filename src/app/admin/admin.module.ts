import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { OverlayModule } from '@angular/cdk/overlay';
import { MatIconModule } from '@angular/material/icon';
import { AdminRoutingModule } from './admin-routing.module';
import { PanelComponent } from '@shared/components/panel/panel.component';
import { CommonModule } from '@angular/common';
import { InputAvatarComponent } from '@shared/components/inputs/input-avatar/input-avatar.component';
import { InputTextComponent } from '@shared/components/inputs/input-text/input-text.component';
import { InputSelectComponent } from '@shared/components/inputs/input-select/input-select.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatDialogModule } from '@angular/material/dialog';
import { FormatDatePipe } from '@app/shared/pipes/format-date.pipe';
import { TableComponent } from '@app/shared/components/table/table.component';
import { InputTextAreaComponent } from '@app/shared/components/inputs/input-text-area/input-text-area.component';
import { InputFileZoneComponent } from '@app/shared/components/inputs/input-file-zone/input-file-zone.component';
import { SkeletonComponent } from '@app/shared/components/skeleton/skeleton.component';
import { DialogService } from '@app/shared/components/dialog/dialog.service';

import { AdminCampingsComponent } from './pages/admin-campings/admin-campings.component';
import { AdminBookingsComponent } from './pages/admin-bookings/admin-bookings.component';
import { AdminUsersComponent } from './pages/admin-users/admin-users.component';
import { AdminProfileComponent } from './pages/admin-profile/admin-profile.component';
import { ProfileComponent } from '@app/shared/components/Profile/profile.component';


@NgModule({
  declarations: [
    AdminCampingsComponent,
    AdminBookingsComponent,
    AdminUsersComponent,
    AdminProfileComponent,
  ],
  imports: [
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    GoogleMapsModule,
    MatDialogModule,
    MatIconModule,
    CommonModule,

    FormatDatePipe,
    PanelComponent,
    TableComponent,
    InputTextComponent,
    InputTextAreaComponent,
    InputFileZoneComponent,
    InputSelectComponent,
    ButtonComponent,
    SkeletonComponent,
    InputAvatarComponent,
    OverlayModule,
    ProfileComponent
  ],
  providers: [DialogService]
})
export class AdminModule { }
