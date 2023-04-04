import { inject, NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRouteSnapshot } from '@angular/router';
import { RoleGuard } from '@guards/role.guard';
import { LeftMenuComponent } from './components/left-menu/left-menu.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { 
    path: '', 
    loadChildren: () =>
          import('./auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: ':role',
    component: LeftMenuComponent, // Add LeftMenuComponent as the component for the role path
    canActivate: [(route:ActivatedRouteSnapshot) => inject(RoleGuard).canLoad(route)],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'campings' // Redirect to campings by default
      },
      {
        path: 'campings',
        loadChildren: () =>
          import('./camping/camping.module').then((m) => m.CampingModule),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./user/user.module').then((m) => m.UserModule),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
