import { inject, NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRouteSnapshot } from '@angular/router';
import { RoleGuard } from '@guards/role.guard';
import { LeftMenuComponent } from './components/left-menu/left-menu.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'auth',
    loadChildren: () =>
          import('./auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'campings',
    loadChildren: () =>
      import('./camping/camping.module').then((m) => m.CampingModule),
  },
  {
    path: ':role',
    component: LeftMenuComponent,
    canActivate: [(route:ActivatedRouteSnapshot) => inject(RoleGuard).canLoad(route)],
    children: [
      {
        path: 'campings',
        loadChildren: () =>
          import('./campingManagement/camping-management.module').then((m) => m.CampingManagementModule),
          canActivateChild: [() => inject(RoleGuard).allowedRoles(['manager'])],
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./user/user.module').then((m) => m.UserModule),
          canActivateChild: [() => inject(RoleGuard).allowedRoles(['user', 'manager', 'admin'])],

      },
      { path: '**', redirectTo: 'profile' },
    ],
  },
  { path: '**', redirectTo: '' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
