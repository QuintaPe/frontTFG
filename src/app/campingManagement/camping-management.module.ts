import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

import { FormatDatePipe } from '@shared/pipes/format-date.pipe';
import { DialogService } from '@shared/components/dialog/dialog.service';

// Components
import { CampingComponent } from './pages/camping/camping.component';
import { CreateCampingComponent } from './pages/create-camping/create-camping.component';
import { CampingRowComponent } from './pages/camping/components/camping-row/camping-row.component';
import { CampingManagementRoutingModule } from './camping-management-routing.module';
import { CampingViewComponent } from './pages/camping-view/camping-view.component';
import { CreateCampingLocationComponent } from './pages/create-camping/components/create-camping-location/create-camping-location.component';
import { CreateCampingLodgingsComponent } from './pages/create-camping/components/create-camping-lodgings/create-camping-lodgings.component';

import { PanelComponent } from '@shared/components/panel/panel.component';
import { TableComponent } from '@shared/components/table/table.component';
import { InputTextComponent } from '@shared/components/inputs/input-text/input-text.component';
import { InputFileZoneComponent } from '@shared/components/inputs/input-file-zone/input-file-zone.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { InputSelectComponent } from '@shared/components/inputs/input-select/input-select.component';
import { InputTextAreaComponent } from '@shared/components/inputs/input-text-area/input-text-area.component';
import { MatIconModule } from '@angular/material/icon';
import { SkeletonComponent } from '@app/shared/components/skeleton/skeleton.component';


@NgModule({
  declarations: [
    CampingComponent,
    CreateCampingComponent,
    CreateCampingLocationComponent,
    CreateCampingLodgingsComponent,
    CampingRowComponent,
    CampingViewComponent,
  ],
  imports: [
    CampingManagementRoutingModule,
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
  ],
  providers: [DialogService]
})

export class CampingManagementModule { }
