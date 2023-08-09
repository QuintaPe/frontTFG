import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CAMPINGS_ROUTES } from '@app/core/routes';

import { CampingViewComponent } from './pages/camping-view/camping-view.component';
import { CampingBookingComponent } from './pages/camping-booking/camping-booking.component';
import { CampingsListComponent } from './pages/campings-list/campings-list.component';

const {
  CAMPING,
  CAMPINGS,
  BOOK_CAMPING,
} = CAMPINGS_ROUTES;

const routes: Routes = [
  { path: CAMPINGS.path, component: CampingsListComponent },
  { path: CAMPING.path, component: CampingViewComponent },
  { path: BOOK_CAMPING.path, component: CampingBookingComponent },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class CampingRoutingModule {  }
