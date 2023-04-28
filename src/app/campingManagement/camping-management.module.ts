import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/shared/shared.module';
import { RouterModule } from '@angular/router';

import { CampingComponent } from './components/camping/camping.component';
import { CreateCampingComponent } from './components/create-camping/create-camping.component';
import { CampingRowComponent } from './components/camping/camping-row/camping-row.component';
import { CampingManagementRoutingModule } from './camping-management-routing.module';
import { CampingViewComponent } from './components/camping-view/camping-view.component';
import { CreateCampingLocationComponent } from './components/create-camping/create-camping-location/create-camping-location.component';
import { CreateCampingUnitsComponent } from './components/create-camping/create-camping-units/create-camping-units.component';
import { CreateCampingPhotosComponent } from './components/create-camping/create-camping-photos/create-camping-photos.component';

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
    RouterModule,
    CampingManagementRoutingModule,
    ReactiveFormsModule, 
    FormsModule,
    TranslateModule,
    SharedModule,
    GoogleMapsModule,
  ],
})
export class CampingManagementModule { }
