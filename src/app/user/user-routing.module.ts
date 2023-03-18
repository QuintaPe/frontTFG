import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './pages/user/user.component';
import { EditAccountComponent } from './components/edit-account/edit-account.component';
import { ManagerGuard } from '@guards/manager.guard';
import { UserGuard } from '@guards/user.guard';
import { CampingComponent } from './components/camping/camping.component';
import { CreateCampingComponent } from './components/create-camping/create-camping.component';


const routes: Routes = [
  { 
    path: 'user', 
    component: UserComponent, 
    canActivate: [UserGuard],
    children: [
      { path: 'bookings', component: UserComponent,   },
      { path: 'edit-account', component: EditAccountComponent, },
    ],
  },
  { 
    path: 'manager', 
    component: UserComponent, 
    canActivate: [ManagerGuard],
    children: [
      { path: 'camping', component: CampingComponent },
      { path: 'camping/:id', component: CreateCampingComponent },
      { path: 'edit-account', component: EditAccountComponent },
    ],
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class UserRoutingModule {  }