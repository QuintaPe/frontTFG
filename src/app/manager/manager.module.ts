import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { EditAccountComponent } from './pages/edit-account/edit-account.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatIconModule } from '@angular/material/icon';
import { ManagerRoutingModule } from './manager-routing.module';
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
import { CampingComponent } from './pages/camping/camping.component';
import { CreateCampingComponent } from './pages/create-camping/create-camping.component';
import { CreateCampingLocationComponent } from './pages/create-camping/components/create-camping-location/create-camping-location.component';
import { CreateCampingLodgingsComponent } from './pages/create-camping/components/create-camping-lodgings/create-camping-lodgings.component';
import { CampingViewComponent } from './pages/camping-view/camping-view.component';
import { DialogService } from '@app/shared/components/dialog/dialog.service';
import { ProfileComponent } from '@app/shared/components/Profile/profile.component';


@NgModule({
  declarations: [
    EditAccountComponent,
    CampingComponent,
    CreateCampingComponent,
    CreateCampingLocationComponent,
    CreateCampingLodgingsComponent,
    CampingViewComponent,
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
  ],
  providers: [DialogService]
})
export class ManagerModule { }
