import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {
  readonly URL_API = 'http://localhost:3000';
  public token;

  public alertError: String;
  public alert: boolean;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    this.token = localStorage.getItem('token');

    this.alertError = '';
    this.alert = false;
  }

  //Registrarse
  public signup(user: Object): Observable<boolean> {
    return this.http
      .post<{ type: boolean; data: string }>(this.URL_API + '/api/users/create-user', user)
      .pipe(
        map((resultado) => {
          return resultado.type;
        })
      );
  }

  //Iniciar Sesion
  login( username: string, password: string ): Observable<{ type: boolean; data: string; token: string }> {
    return this.http
      .post<{ type: boolean; data: string; token: string }>(
        this.URL_API + '/api/login',
        { username, password }
      )
      .pipe(
        map((resultado) => {
          if (resultado.type) localStorage.setItem('token', resultado.token);
          return resultado;
        })
      );
  }

  //Cerrar Sesion
  logout(): void {
    localStorage.removeItem('token');
  }

  public get isUserAuth(): boolean {
    if (localStorage.getItem('token') === null) {
      return false;
    }
    return !this.isTokenExpired(JSON.stringify(localStorage.getItem('token')));
  }

  private isTokenExpired(token: string): boolean {
    if (this.jwtHelper.isTokenExpired(token)) this.logout();

    return this.jwtHelper.isTokenExpired(token);
  }

  // Funciones para el token
  comprobarToken(): Observable<boolean> {
    return this.http
      .get<{ tokenValido: boolean }>(
        this.URL_API + '/api/comprobar-token?token=' + this.token
      )
      .pipe(
        map((resultado) => {
          if (resultado.tokenValido === true) {
            console.log('Token válido.');
            return true;
          }

          console.log('Token inválido.');
          return false;
        })
      );
  }

  public miId() {
    if (this.token) {
      var valoresToken: any = this.jwtHelper.decodeToken(this.token);
      console.log(valoresToken)
      return valoresToken.userId;
    }
    console.log('error de token');
  }
}
