import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TranslateService } from '@ngx-translate/core';
import { User } from '@app/user/models/user';

@Injectable()
export class AuthService {
  readonly URL_API = 'http://localhost:3000';
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
      .post<{ type: boolean; data: string }>(this.URL_API + '/api/users/create-user', user)
      .pipe(map(response => response.type));
  }

  //Iniciar Sesion
  login( username: string, password: string ): Observable<{ success: boolean; user: User; error:string; token: string }> {
    return this.http
      .post<{ success: boolean; user: User; error:string; token: string  }>(
        this.URL_API + '/api/login', { username, password }
      )
      .pipe(map((response) => {
        if (response.success) {
          localStorage.setItem('token', response.token);
          this.translate.use(response.user.lang)
        }
        return response;
      }));
  }

  //Cerrar Sesion
  logout(): void {
    localStorage.removeItem('token');
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

  // Funciones para el token
  comprobarToken(): Observable<boolean> {
    return this.http
      .get<{ tokenValido: boolean }>(
        this.URL_API + '/api/comprobar-token?token=' + localStorage.getItem('token')
      )
      .pipe(
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
      return valoresToken.userId;
    }
    console.log('error de token');
  }
}
