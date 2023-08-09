import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { LogoutComponent } from './pages/logout/logout.component';

import { AUTH_ROUTES } from '@app/core/routes';
import { allowedRole } from '@app/core/guards/role.guard';

const {
  LOGIN,
  SIGNUP,
  SIGNUP_MANAGER,
  LOGOUT,
} = AUTH_ROUTES;

const routes: Routes = [
  { path: LOGIN.path, component: AuthComponent, canActivate: [() => allowedRole('guest')] },
  { path: SIGNUP.path, component: AuthComponent, canActivate: [() => allowedRole('guest')] },
  { path: SIGNUP_MANAGER.path, component: AuthComponent, canActivate: [() => allowedRole('guest')] },
  { path: LOGOUT.path, component: LogoutComponent },
  { path: '**', redirectTo: LOGIN.path },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
