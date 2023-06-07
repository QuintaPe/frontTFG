import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampingViewComponent } from './components/camping-view/camping-view.component';
import { CAMPINGS_ROUTES } from '@app/core/routes';
import { CampingBookingComponent } from './components/camping-booking/camping-booking.component';

const {
  CAMPING,
  BOOK_CAMPING,
} = CAMPINGS_ROUTES;

const routes: Routes = [
  { path: CAMPING.path, component: CampingViewComponent },
  { path: BOOK_CAMPING.path, component: CampingBookingComponent },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class CampingRoutingModule {  }
