import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '@app/shared/services/api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private errors: { message: string, error: string }[] = [];

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
          this.translate.use(response.user.lang);
          this.router.navigate(['']);
      }
    } catch (axiosError: any) {
      this.errors = axiosError.response.data.errors;
    }
  }

  //Cerrar Sesion
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('lang');
    this.translate.use(this.translate.getBrowserLang() || 'es')
  }

  get user() {
    const token = localStorage.getItem('token');

    if (!token) {
      return null;
    }

    return this.jwtHelper.decodeToken(token).user;
  }

  get isUserAuth(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    if (this.jwtHelper.isTokenExpired(token)) {
      this.logout();
    }

    return !this.jwtHelper.isTokenExpired(token);
  }

  get userToken(): string | null {
    const token = localStorage.getItem('token');
    if (!token || this.jwtHelper.isTokenExpired(token)) {
      this.logout();
      return null;
    }

    return token;
  }
}
