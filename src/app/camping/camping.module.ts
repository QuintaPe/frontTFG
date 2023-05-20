import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { OverlayModule } from '@angular/cdk/overlay';

import { CampingRoutingModule } from './camping-routing.module';
import { CampingViewComponent } from './components/camping-view/camping-view.component';
import { LoaderComponent } from '@shared/components/loader/loader.component';
import { ButtonComponent } from '@app/shared/components/button/button.component';
import { InputTextComponent } from '@app/shared/components/inputs/input-text/input-text.component';
import { TableComponent } from '@app/shared/components/table/table.component';

@NgModule({
  declarations: [
    CampingViewComponent,
  ],
  imports: [
    CampingRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    OverlayModule,
    MatIconModule,
    GoogleMapsModule,

    LoaderComponent,
    ButtonComponent,
    InputTextComponent,
    TableComponent,
  ],
})

export class CampingModule { }
