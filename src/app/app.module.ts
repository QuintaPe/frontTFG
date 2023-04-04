import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { AppRoutingModule } from './app-routing.module';
import { JwtModule } from '@auth0/angular-jwt';

// import ngx-translate and the http loader
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { UserModule } from './user/user.module';
import { CampingModule } from './camping/camping.module';
import { HomeComponent } from './home/home.component';
import { LeftMenuComponent } from './components/left-menu/left-menu.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}
export const createTranslateLoader = (http: HttpClient) => {
  return new TranslateHttpLoader(http, './i18n/', '.json');
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LeftMenuComponent,
    NavBarComponent,
  ],
  imports: [
    AppRoutingModule,
    AuthModule,
    UserModule,
    CampingModule,
    BrowserModule,
    SharedModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:4200'],
        disallowedRoutes: [''],
      },
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    NgbModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
