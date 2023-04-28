import { NgModule, APP_INITIALIZER } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { JwtModule } from '@auth0/angular-jwt';

// import ngx-translate and the http loader
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatIconModule } from '@angular/material/icon';
import { GoogleMapsModule } from '@angular/google-maps';

// APP Components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LeftMenuComponent } from './components/left-menu/left-menu.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

// APP Modules
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CampingModule } from './camping/camping.module';
import { CampingManagementModule } from './campingManagement/camping-management.module';
import { SharedModule } from './shared/shared.module';

// APP Services
import { AuthService } from './auth/services/auth.service';


export function tokenGetter() {
  return localStorage.getItem('access_token');
}
export const createTranslateLoader = (http: HttpClient) => {
  return new TranslateHttpLoader(http, './i18n/', '.json');
};

export function initApp(authService: AuthService) {
    if(authService.isUserAuth) {
      return () => authService.setLoggedUser()
    } else {
      return () => Promise.resolve();
    }
}

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
    CampingManagementModule,
    SharedModule,
    BrowserModule,
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
    MatIconModule,
    GoogleMapsModule,
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initApp,
    multi: true,
    deps: [AuthService]
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
