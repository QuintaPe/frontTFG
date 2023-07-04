import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditAccountComponent } from './pages/edit-account/edit-account.component';
import { UserBookingsComponent } from './pages/user-bookings/user-bookings.component';
import { CampingsFavoritesComponent } from '@app/camping/components/camping-favorites/campings-favorites.component';


const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../core/components/left-menu/left-menu.component').then((m) => m.LeftMenuComponent),
    children: [
      {
        path: 'profile',
        component: EditAccountComponent,
      },
      {
        path: 'bookings',
        component: UserBookingsComponent,
      },
      {
        path: 'favorites',
        component: CampingsFavoritesComponent,
      },
      {
        path: '**',
        redirectTo: 'profile',
      },
    ],
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class UserRoutingModule {  }
