import { Injectable, inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { User } from '@models/user';
import { fetch } from '@utils/api';
import { ErrorService } from '@app/core/services/errors.service';

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public user: User | null = null;
  public loading: boolean = true;
  timeoutRef: any;

  private jwtHelper = inject(JwtHelperService);
  public translate = inject(TranslateService);
  public router = inject(Router);
  public errorService = inject(ErrorService);

  //Registrarse
  async signup(user: User, confirmPassword: string): Promise<any> {
    try {
      await fetch('POST', 'signup', { ...user, confirmPassword });
      await this.login(user.email, user.password);
      this.router.navigate([''])
    } catch (error: any) {
      this.errorService.setError(error)
      throw error;
    }
  }

  //Iniciar Sesión
  async login( email: string, password: string ): Promise<any> {
    try {
      const response = await fetch('POST', 'login', { email, password });
      localStorage.setItem('token', response.token);
      localStorage.setItem('lang', response.user.lang);
      this.user = response.user;
      this.translate.use(response.user.lang);
      this.router.navigate(['']);
    } catch (error: any) {
      this.errorService.setError(error)
      throw error;
    }
  }

  //Cerrar Sesión
  logout(): void {
    this.user = null;
    localStorage.removeItem('token');
    localStorage.removeItem('lang');
    this.translate.use(this.translate.getBrowserLang() || 'es');
    this.router.navigateByUrl('auth/login');
  }

  async setLoggedUser() {
    this.loading = true;
    const token = localStorage.getItem('token');
    const decoded = token ? this.jwtHelper.decodeToken(token) : null;
    try {
      this.user = decoded ? await fetch('GET', `users/${decoded.user._id}`) : null;
      this.loading = false;
    } catch {
      this.loading = false;
    }
  }

  get userToken(): string | null {
    const token = localStorage.getItem('token');
    if (!token || this.jwtHelper.isTokenExpired(token)) {
      return null;
    }

    return token;
  }

  get isUserAuth(): boolean {
    return !!this.user || !!this.userToken;
  }
}
