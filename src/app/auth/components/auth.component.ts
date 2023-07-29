import { Component, inject, ViewEncapsulation } from '@angular/core';
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
}
