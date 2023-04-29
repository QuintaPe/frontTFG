import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { OverlayModule } from '@angular/cdk/overlay';

import { CampingRoutingModule } from './camping-routing.module';
import { CampingViewComponent } from './components/camping-view/camping-view.component';
import { LoaderComponent } from '@app/shared/components/loader/loader.component';
import { DialogService } from '@app/shared/components/dialog/dialog.service';

@NgModule({
  declarations: [
    CampingViewComponent,
  ],
  imports: [
    CampingRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    OverlayModule,
    MatIconModule,
    GoogleMapsModule,

    LoaderComponent,
  ],
})

export class CampingModule { }
