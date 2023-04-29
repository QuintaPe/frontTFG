import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '@core/services/api.service';
import { Router } from '@angular/router';
import { User } from '@models/user';

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public user: User | null = null;
  private errors: { message: string, error: string }[] = [];
  public loading: boolean = true;

  constructor(
    private apiService: ApiService,
    private jwtHelper: JwtHelperService,
    public translate: TranslateService,
    public router: Router,
  ) {}

  public setErrors(errors: { message: string, error: string }[]) {
    this.errors = errors;
    setTimeout(() => {
      this.errors = [];
    }, 5000);
  }

    public getErrors() {
      return this.errors;
    }

  //Registrarse
  async signup(user: Object): Promise<any> {
    try {
      const response = await this.apiService.fetch('POST', 'signup', { ...user });
      if (response.success) {
        this.router.navigate(['']);
      }
    } catch (axiosError: any) {
      this.errors = axiosError.response.data.errors;
    }
  }

  //Iniciar Sesion
  async login( email: string, password: string ): Promise<any> {
    try {
      const response = await this.apiService.fetch('POST', 'login', { email, password });
      if (response.success) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('lang', response.user.lang);
          this.user = response.user;
          this.translate.use(response.user.lang);
          this.router.navigate(['']);
      }
    } catch (axiosError: any) {
      this.errors = axiosError.response.data.errors;
    }
  }

  //Cerrar Sesion
  logout(): void {
    this.user = null;
    localStorage.removeItem('token');
    localStorage.removeItem('lang');
    this.translate.use(this.translate.getBrowserLang() || 'es')
  }

  async setLoggedUser() {
    this.loading = true;
    const token = localStorage.getItem('token');
    const decoded = token ? this.jwtHelper.decodeToken(token) : null;
    try {
      this.user = decoded ? await this.apiService.fetch('GET', `users/${decoded.user._id}`) : null;
      this.loading = false;
    } catch {
      this.loading = false;
    }
  }

  get userToken(): string | null {
    const token = localStorage.getItem('token');
    if (!token || this.jwtHelper.isTokenExpired(token)) {
      this.logout();
      return null;
    }

    return token;
  }

  get isUserAuth(): boolean {
    return !!this.user || !!this.userToken;
  }
}
