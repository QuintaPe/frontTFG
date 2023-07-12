import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { User } from '@models/user';
import { fetch } from '@utils/api';

interface AuthError {
  name: string,
  statusCode?: string
  field?: string,
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public user: User | null = null;
  private error: AuthError | null = null;
  public loading: boolean = true;
  timeoutRef: any;

  constructor(
    private jwtHelper: JwtHelperService,
    public translate: TranslateService,
    public router: Router,
  ) {}

  public setError(error: AuthError | null) {
    clearTimeout(this.timeoutRef);
    this.error = error;
    this.timeoutRef = setTimeout(() => {
      this.error = null;
    }, 5000);
  }

  public getError() {
    return this.error;
  }

  //Registrarse
  async signup(user: Object): Promise<any> {
    try {
      const response = await fetch('POST', 'signup', { ...user });
      this.router.navigate(['']);

    } catch (error: any) {
      this.setError(error)
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
      console.log(error);
      this.setError(error)
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
