import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditAccountComponent } from './pages/edit-account/edit-account.component';
import { MANAGER_ROUTES } from '@app/core/routes';
import { CampingComponent } from './pages/camping/camping.component';
import { CreateCampingComponent } from './pages/create-camping/create-camping.component';
import { CampingViewComponent } from './pages/camping-view/camping-view.component';

const {
  CAMPINGS,
  NEW_CAMPING,
  EDIT_CAMPING,
  VIEW_CAMPING,
  PROFILE,
} = MANAGER_ROUTES;


const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../core/components/left-menu/left-menu.component').then((m) => m.LeftMenuComponent),
    children: [
      { path: CAMPINGS.path, component: CampingComponent },
      { path: NEW_CAMPING.path, component: CreateCampingComponent },
      { path: EDIT_CAMPING.path, component: CreateCampingComponent },
      { path: VIEW_CAMPING.path, component: CampingViewComponent },
      { path: PROFILE.path, component: EditAccountComponent },
      { path: '**', redirectTo: PROFILE.path },
    ],
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class ManagerRoutingModule {  }
