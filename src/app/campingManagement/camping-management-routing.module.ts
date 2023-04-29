import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CampingViewComponent } from './pages/camping-view/camping-view.component';
import { CampingComponent } from './pages/camping/camping.component';
import { CreateCampingComponent } from './pages/create-camping/create-camping.component';

import { CAMPINGS_MANAGEMENT_ROUTES } from './routes';

const routes: Routes = [
  { path: CAMPINGS_MANAGEMENT_ROUTES.CAMPINGS, component: CampingComponent },
  { path: CAMPINGS_MANAGEMENT_ROUTES.NEW_CAMPING, component: CreateCampingComponent },
  { path: CAMPINGS_MANAGEMENT_ROUTES.EDIT_CAMPING, component: CreateCampingComponent },
  { path: CAMPINGS_MANAGEMENT_ROUTES.VIEW_CAMPING, component: CampingViewComponent },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class CampingManagementRoutingModule {  }
