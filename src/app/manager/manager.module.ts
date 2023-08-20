import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { OverlayModule } from '@angular/cdk/overlay';
import { GoogleMapsModule } from '@angular/google-maps';
import { TranslateModule } from '@ngx-translate/core';

// Shared
import { InputSelectComponent } from '@shared/components/inputs/input-select/input-select.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { InputTextComponent } from '@shared/components/inputs/input-text/input-text.component';
import { DialogService } from '@shared/components/dialog/dialog.service';
import { TableComponent } from '@shared/components/table/table.component';
import { PanelComponent } from '@shared/components/panel/panel.component';
import { InputAvatarComponent } from '@shared/components/inputs/input-avatar/input-avatar.component';
import { ProfileComponent } from '@shared/components/Profile/profile.component';
import { FormatDatePipe } from '@shared/pipes/format-date.pipe';
import { InputTextAreaComponent } from '@shared/components/inputs/input-text-area/input-text-area.component';
import { InputFileZoneComponent } from '@shared/components/inputs/input-file-zone/input-file-zone.component';
import { SkeletonComponent } from '@shared/components/skeleton/skeleton.component';
import { TabsComponent } from '@shared/components/tabs/tabs.component';
import { AvatarComponent } from '@shared/components/Avatar/avatar.component';

// Components
import { EditAccountComponent } from './pages/edit-account/edit-account.component';
import { MyCampingsComponent } from './pages/camping/my-campings.component';
import { CreateCampingComponent } from './pages/create-camping/create-camping.component';
import { CreateCampingLocationComponent } from './pages/create-camping/components/create-camping-location/create-camping-location.component';
import { CreateCampingLodgingsComponent } from './pages/create-camping/components/create-camping-lodgings/create-camping-lodgings.component';
import { CampingManagementComponent } from './pages/camping-management/camping-management.component';
import { CampingManagementTableComponent } from './pages/camping-management/components/camping-management-table/camping-management-table.component';
import { CampingManagementCalendarComponent } from './pages/camping-management/components/camping-management-calendar/camping-management-calendar.component';

// Routing module
import { ManagerRoutingModule } from './manager-routing.module';
import { PopupService } from '@app/shared/components/popup/popup.service';
import { ManagerConversationsComponent } from './pages/manager-conversations/manager-conversations.component';
import { CampingConversationsComponent } from './pages/camping-conversations/camping-conversations.component.';

@NgModule({
  declarations: [
    EditAccountComponent,
    MyCampingsComponent,
    CreateCampingComponent,
    CreateCampingLocationComponent,
    CreateCampingLodgingsComponent,

    CampingManagementComponent,
    CampingManagementTableComponent,
    CampingManagementCalendarComponent,
    ManagerConversationsComponent,
    CampingConversationsComponent,
  ],
  imports: [
    ManagerRoutingModule,
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
    ProfileComponent,
    TabsComponent,
    AvatarComponent,
  ],
  providers: [DialogService, PopupService]
})
export class ManagerModule { }
