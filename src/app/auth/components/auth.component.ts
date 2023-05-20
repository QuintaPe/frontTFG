import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';
import { AUTH_ROUTES } from '@app/core/routes';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  protected router = inject(Router);
  protected authService = inject(AuthService);

  get isLogin() {
    return this.router.url === `/${AUTH_ROUTES.LOGIN.url}`;
  }

  get isUserSignup() {
    return this.router.url === `/${AUTH_ROUTES.SIGNUP.url}`;
  }

  get isManagerSignup() {
    return this.router.url === `/${AUTH_ROUTES.SIGNUP_MANAGER.url}`;
  }
}
