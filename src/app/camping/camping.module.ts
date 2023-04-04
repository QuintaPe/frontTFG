import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { OverlayModule } from '@angular/cdk/overlay';

import { CampingComponent } from './components/camping/camping.component';
import { CreateCampingComponent } from './components/create-camping/create-camping.component';
import { CampingRowComponent } from './components/camping/camping-row/camping-row.component';
import { CampingRoutingModule } from './camping-routing.module';

@NgModule({
  declarations: [
    CampingComponent,
    CreateCampingComponent,
    CampingRowComponent
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
  ],
})
export class CampingModule { }
