import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { OverlayModule } from '@angular/cdk/overlay';
import { GoogleMapsModule } from '@angular/google-maps';
import { TranslateModule } from '@ngx-translate/core';
import { GalleryModule } from 'ng-gallery';

// Shared
import { TableComponent } from '@shared/components/table/table.component';
import { PanelComponent } from '@shared/components/panel/panel.component';
import { LoaderComponent } from '@shared/components/loader/loader.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { AvatarComponent } from '@shared/components/Avatar/avatar.component';
import { SvgIconComponent } from '@shared/components/svg-icon/svg-icon.component';
import { SkeletonComponent } from '@shared/components/skeleton/skeleton.component';
import { InputTextComponent } from '@shared/components/inputs/input-text/input-text.component';
import { InputStarsComponent } from '@shared/components/inputs/input-stars/input-stars.component';
import { InputDateRangeComponent } from '@shared/components/inputs/input-date-range/input-date-range.component';
import { CampingSearcherComponent } from '@shared/components/camping-searcher/camping-searcher.component';
import { DialogService } from '@shared/components/dialog/dialog.service';
import { TruncatePipe } from '@shared/pipes/truncate.pipe';

// Components
import { CampingViewBookingComponent } from './pages/camping-view/components/camping-view-booking/camping-view-booking.component';
import { CampingViewGalleyComponent } from './pages/camping-view/components/camping-view-gallery/camping-view-gallery.component';
import { CampingViewLocationComponent } from './pages/camping-view/components/camping-view-location/camping-view-location.component';
import { CampingsListComponent } from './pages/campings-list/campings-list.component';
import { CampingViewReviewsComponent } from './pages/camping-view/components/camping-view-reviews/camping-view-review.component';
import { CampingBookingComponent } from './pages/camping-booking/camping-booking.component';
import { CampingViewComponent } from './pages/camping-view/camping-view.component';
import { ReviewRowComponent } from './pages/camping-view/components/camping-view-reviews/component/review-row/review-row.component';
import { CampingRowComponent } from './components/camping-row/camping-row.component';

// Routing module
import { CampingRoutingModule } from './camping-routing.module';

@NgModule({
  declarations: [
    CampingViewComponent,
    CampingViewGalleyComponent,
    CampingViewLocationComponent,
    CampingViewBookingComponent,
    CampingViewReviewsComponent,
    ReviewRowComponent,

    CampingBookingComponent,
    CampingsListComponent,
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
    TruncatePipe,

    LoaderComponent,
    ButtonComponent,
    InputTextComponent,
    TableComponent,
    AvatarComponent,
    SkeletonComponent,
    PanelComponent,
    CampingSearcherComponent,
    InputDateRangeComponent,
    SvgIconComponent,
    CampingRowComponent,
    InputStarsComponent,
  ],
  providers: [DialogService],
})
export class CampingModule {}
