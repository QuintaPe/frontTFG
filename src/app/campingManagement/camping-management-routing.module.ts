import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampingViewComponent } from './components/camping-view/camping-view.component';

import { CampingComponent } from './components/camping/camping.component';
import { CreateCampingComponent } from './components/create-camping/create-camping.component';
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