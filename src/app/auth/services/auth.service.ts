import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TranslateService } from '@ngx-translate/core';
import { User } from '@models/user';
import { apiEnviroment } from 'src/environments/environment';

const {API_BASE_URL, API_URL } = apiEnviroment

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public alertError: String;
  public alert: boolean;

  constructor(
    private http: HttpClient, 
    private jwtHelper: JwtHelperService,
    public translate: TranslateService,
  ) {
    this.alertError = '';
    this.alert = false;
  }

  //Registrarse
  public signup(user: Object): Observable<boolean> {
    return this.http
      .post<{ success: boolean }>(`${API_BASE_URL}/users`, user)
      .pipe(map(response => response.success));
  }

  //Iniciar Sesion
  login( email: string, password: string ): Observable<{ success: boolean; user: User; error:string; token: string }> {
    return this.http
      .post<{ success: boolean; user: User; error:string; token: string  }>(
        `${API_BASE_URL}/login`, { email, password }
      )
      .pipe(map((response) => {
        if (response.success) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('lang', response.user.lang);
          this.translate.use(response.user.lang);
        }
        return response;
      }));
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
    //comprobarToken
    if (!token || this.jwtHelper.isTokenExpired(token)) {
      this.logout();
      return null;
    }

    return token;
  }

  // Funciones para el token
  comprobarToken(): Observable<boolean> {
    return this.http
      .get<{ tokenValido: boolean }>(
        `${API_BASE_URL}/comprobar-token?token=${localStorage.getItem('token')}`
      ).pipe(
        map((response) => {
          if (response.tokenValido === true) {
            console.log('Token válido.');
            return true;
          }

          console.log('Token inválido.');
          return false;
        })
      );
  }

  miId() {
    const token = localStorage.getItem('token') ?? null
    if (token) {
      var valoresToken: any = this.jwtHelper.decodeToken(token);
      return valoresToken.user._id;
    }
    console.log('error de token');
  }
}
