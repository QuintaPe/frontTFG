import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CampingComponent } from './components/camping/camping.component';
import { CreateCampingComponent } from './components/create-camping/create-camping.component';


const routes: Routes = [
  { 
    path: '', 
    children: [
      { path: '', component: CampingComponent },
      { path: 'new', component: CreateCampingComponent },
      { path: ':id', component: CreateCampingComponent },
    ],
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class CampingRoutingModule {  }