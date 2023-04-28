import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
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
  }

  get isLogin() {
    return true;
  }

  get isUserSignup() {
    return this.router.url === 'auth/signup';
  }

  get isManagerSignup() {
    return this.router.url === 'auth/manager/signup';
  }
}
