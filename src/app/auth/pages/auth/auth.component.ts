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
}
