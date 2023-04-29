import { Routes } from '@angular/router';
import { canLoad, allowedRoles } from '@guards/role.guard';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./core/components/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'campings',
    loadChildren: () => import('./camping/camping.module').then((m) => m.CampingModule),
  },
  {
    path: ':role',
    loadComponent: () => import('./core/components/left-menu/left-menu.component').then((m) => m.LeftMenuComponent),
    canActivate: [canLoad],
    children: [
      {
        path: 'campings',
        loadChildren: () => import('./campingManagement/camping-management.module').then((m) => m.CampingManagementModule),
        canActivateChild: [() => allowedRoles(['manager'])],
      },
      {
        path: 'profile',
        loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
        canActivateChild: [() => allowedRoles(['user', 'manager', 'admin'])],
      },
      {
        path: '**',
        redirectTo: 'profile',
      },
    ],
  },
  {
    path: '**',
    redirectTo: ''
  },
];
