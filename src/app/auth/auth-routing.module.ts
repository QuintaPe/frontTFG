import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NoAuthGuard } from '../../guards/noauth.guard';
import { AuthComponent } from './pages/auth/auth.component';


const routes: Routes = [
  { path: 'login' , component: AuthComponent, canActivate: [NoAuthGuard]},
  { path: 'signup', component: AuthComponent, canActivate: [NoAuthGuard]},
  { path: 'manager/signup', component: AuthComponent, canActivate: [NoAuthGuard]},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AuthRoutingModule {  }