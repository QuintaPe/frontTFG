import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampingViewComponent } from './components/camping-view/camping-view.component';

const routes: Routes = [
  { path: ':id', component: CampingViewComponent },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class CampingRoutingModule {  }