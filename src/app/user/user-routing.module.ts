import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditAccountComponent } from './pages/edit-account/edit-account.component';
import { UserBookingsComponent } from './pages/user-bookings/user-bookings.component';
import { CampingsFavoritesComponent } from './pages/camping-favorites/campings-favorites.component';
import { USER_ROUTES } from '@app/core/routes';

const {
  PROFILE,
  BOOKINGS,
  FAVORITE_CAMPINGS,
} = USER_ROUTES;

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../core/components/left-menu/left-menu.component').then((m) => m.LeftMenuComponent),
    children: [
      { path: PROFILE.path, component: EditAccountComponent },
      { path: BOOKINGS.path, component: UserBookingsComponent },
      { path: FAVORITE_CAMPINGS.path, component: CampingsFavoritesComponent },
      { path: '**', redirectTo: '/' },
    ],
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class UserRoutingModule {  }
