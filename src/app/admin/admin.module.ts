import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { OverlayModule } from '@angular/cdk/overlay';
import { GoogleMapsModule } from '@angular/google-maps';
import { TranslateModule } from '@ngx-translate/core';

// Shared
import { PanelComponent } from '@shared/components/panel/panel.component';
import { InputAvatarComponent } from '@shared/components/inputs/input-avatar/input-avatar.component';
import { InputTextComponent } from '@shared/components/inputs/input-text/input-text.component';
import { InputSelectComponent } from '@shared/components/inputs/input-select/input-select.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { TableComponent } from '@shared/components/table/table.component';
import { InputTextAreaComponent } from '@shared/components/inputs/input-text-area/input-text-area.component';
import { InputFileZoneComponent } from '@shared/components/inputs/input-file-zone/input-file-zone.component';
import { SkeletonComponent } from '@shared/components/skeleton/skeleton.component';
import { DialogService } from '@shared/components/dialog/dialog.service';
import { ProfileComponent } from '@shared/components/Profile/profile.component';
import { FormatDatePipe } from '@shared/pipes/format-date.pipe';

// Components
import { AdminCampingsComponent } from './pages/admin-campings/admin-campings.component';
import { AdminBookingsComponent } from './pages/admin-bookings/admin-bookings.component';
import { AdminUsersComponent } from './pages/admin-users/admin-users.component';
import { AdminProfileComponent } from './pages/admin-profile/admin-profile.component';

// Routing module
import { AdminRoutingModule } from './admin-routing.module';

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
