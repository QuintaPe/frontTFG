import { Routes } from '@angular/router';
import { allowedRole } from '@guards/role.guard';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./core/components/home/home.component').then((m) => m.HomeComponent),
    pathMatch: 'full',
    canActivate: [() => allowedRole(['user', 'guest'])]
  },
  {
    path: 'terms',
    loadComponent: () => import('./core/components/terms/terms.component').then((m) => m.TermsComponent),
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
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
    canActivate: [() => allowedRole('user')]
  },
  {
    path: 'manager',
    loadChildren: () => import('./manager/manager.module').then((m) => m.ManagerModule),
    canActivate: [() => allowedRole('manager')]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
    canActivate: [() => allowedRole('admin')]
  },
  {
    path: '**',
    redirectTo: ''
  },
];
