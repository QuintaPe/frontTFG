import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  private type: string = '';
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public authService: AuthService,
  ) {
    const type = this.route.snapshot.paramMap.get('type');
    if (!type || !['login', 'signup', 'manager/signup'].includes(type)) {
      this.router.navigate(['/']);
      return;
    }
    this.type = type;

  }

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
