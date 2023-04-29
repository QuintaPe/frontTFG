import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { canLoad, allowedRoles } from '@guards/role.guard';
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
    canActivate: [canLoad],
    children: [
      {
        path: 'campings',
        loadChildren: () =>
          import('./campingManagement/camping-management.module').then((m) => m.CampingManagementModule),
          canActivateChild: [() => allowedRoles(['manager'])],
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./user/user.module').then((m) => m.UserModule),
          canActivateChild: [() => allowedRoles(['user', 'manager', 'admin'])],

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
