import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  errors: string = '';

  constructor(
    public router: Router,
  ) {}

  setErrors = (error: string) => {
    this.errors = error;
    setTimeout(() => {
      this.errors = '';
    }, 5000);
  };

  get isLogin() {
    return this.router.url === '/login';
  }

  get isUserSignup() {
    return this.router.url === '/signup';
  }

  get isManagerSignup() {
    return this.router.url === '/manager/signup';
  }
}
