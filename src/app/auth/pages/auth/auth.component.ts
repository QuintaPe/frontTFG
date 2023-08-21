import { Component, inject, ViewEncapsulation, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorService } from '@app/core/services/errors.service';
import { AUTH_ROUTES } from '@app/core/routes';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AuthComponent {
  @Input() token = '';
  protected router = inject(Router);
  protected errorService = inject(ErrorService);

  get isLogin() {
    return this.router.url === `/${AUTH_ROUTES.LOGIN.url}`;
  }

  get isUserSignup() {
    return this.router.url === `/${AUTH_ROUTES.SIGNUP.url}`;
  }

  get isManagerSignup() {
    return this.router.url === `/${AUTH_ROUTES.SIGNUP_MANAGER.url}`;
  }

  get isForgotPassword() {
    return this.router.url === `/${AUTH_ROUTES.FORGOT_PASSWORD.url}`;
  }

  get isRecoveryPassword() {
    const recoveryPasswordRoutePattern = new RegExp(`^/${AUTH_ROUTES.FORGOT_PASSWORD.url}/.*$`);
    return recoveryPasswordRoutePattern.test(this.router.url);
  }
}
