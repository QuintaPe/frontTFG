import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeGuard } from '@guards/home.guard';
import { HomeComponent } from './page/home.component';

const routes: Routes = [
  { path: '' , component: HomeComponent, canActivate: [HomeGuard] },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class HomeRoutingModule {  }