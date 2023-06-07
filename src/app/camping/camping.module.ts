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
import { MatDialogModule } from '@angular/material/dialog';
import { CampingViewGalleyComponent } from './components/camping-view/components/camping-view-gallery/camping-view-gallery.component';
import { GalleryModule } from 'ng-gallery';
import { NgOptimizedImage } from '@angular/common'
import { CampingViewLocationComponent } from './components/camping-view/components/camping-view-location/camping-view-location.component';
import { CampingViewBookingComponent } from './components/camping-view/components/camping-view-booking/camping-view-booking.component';
import { AvatarComponent } from '@app/shared/components/Avatar/avatar.component';
import { CampingBookingComponent } from './components/camping-booking/camping-booking.component';
import { SkeletonComponent } from '@app/shared/components/skeleton/skeleton.component';

@NgModule({
  declarations: [
    CampingViewComponent,
    CampingViewGalleyComponent,
    CampingViewLocationComponent,
    CampingViewBookingComponent,

    CampingBookingComponent,
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
    MatDialogModule,
    GalleryModule,
    NgOptimizedImage,

    LoaderComponent,
    ButtonComponent,
    InputTextComponent,
    TableComponent,
    AvatarComponent,
    SkeletonComponent,
  ],
})

export class CampingModule { }
