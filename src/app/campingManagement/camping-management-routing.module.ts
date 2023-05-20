import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CampingViewComponent } from './pages/camping-view/camping-view.component';
import { CampingComponent } from './pages/camping/camping.component';
import { CreateCampingComponent } from './pages/create-camping/create-camping.component';

import { CAMPINGS_MANAGEMENT_ROUTES } from '../core/routes';

const {
  CAMPINGS,
  NEW_CAMPING,
  EDIT_CAMPING,
  VIEW_CAMPING,
} = CAMPINGS_MANAGEMENT_ROUTES;

const routes: Routes = [
  { path: CAMPINGS.path, component: CampingComponent },
  { path: NEW_CAMPING.path, component: CreateCampingComponent },
  { path: EDIT_CAMPING.path, component: CreateCampingComponent },
  { path: VIEW_CAMPING.path, component: CampingViewComponent },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class CampingManagementRoutingModule {  }
