import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

import { FormatDatePipe } from '@shared/pipes/format-date.pipe';
import { DialogService } from '@shared/components/dialog/dialog.service';

// Components
import { CampingComponent } from './components/camping/camping.component';
import { CreateCampingComponent } from './components/create-camping/create-camping.component';
import { CampingRowComponent } from './components/camping/camping-row/camping-row.component';
import { CampingManagementRoutingModule } from './camping-management-routing.module';
import { CampingViewComponent } from './components/camping-view/camping-view.component';
import { CreateCampingLocationComponent } from './components/create-camping/create-camping-location/create-camping-location.component';
import { CreateCampingUnitsComponent } from './components/create-camping/create-camping-units/create-camping-units.component';
import { CreateCampingPhotosComponent } from './components/create-camping/create-camping-photos/create-camping-photos.component';

import { PanelComponent } from '@shared/components/panel/panel.component';
import { AngularTableComponent } from '@shared/components/table/table.component';
import { InputTextComponent } from '@shared/components/inputs/input-text/input-text.component';
import { InputFileZoneComponent } from '@shared/components/inputs/input-file-zone/input-file-zone.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { InputSelectComponent } from '@shared/components/inputs/input-select/input-select.component';
import { InputTextAreaComponent } from '@shared/components/inputs/input-text-area/input-text-area.component';


@NgModule({
  declarations: [
    CampingComponent,
    CreateCampingComponent,
    CreateCampingLocationComponent,
    CreateCampingPhotosComponent,
    CreateCampingUnitsComponent,
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
    CommonModule,

    FormatDatePipe,
    PanelComponent,
    AngularTableComponent,
    InputTextComponent,
    InputTextAreaComponent,
    InputFileZoneComponent,
    InputSelectComponent,
    ButtonComponent,
  ],
  providers: [DialogService]
})

export class CampingManagementModule { }
