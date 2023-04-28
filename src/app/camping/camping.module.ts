import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { OverlayModule } from '@angular/cdk/overlay';

import { CampingRoutingModule } from './camping-routing.module';
import { CampingViewComponent } from './components/camping-view/camping-view.component';

@NgModule({
  declarations: [
    CampingViewComponent,
  ],
  imports: [
    CampingRoutingModule,
    ReactiveFormsModule, 
    FormsModule,
    TranslateModule,
    SharedModule,
    RouterModule,
    OverlayModule,
    MatIconModule,
    GoogleMapsModule,
  ],
})

export class CampingModule { }
