import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { AuthRoutingModule } from './auth/auth-routing.module';
// import { AppRoutingModule } from './app-routing.module';
import { JwtModule } from '@auth0/angular-jwt';

// import ngx-translate and the http loader
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { UserModule } from './user/user.module';
import { UserRoutingModule } from './user/user-routing.module';
import { SharedRoutingModule } from './shared/shared-routing.module';
import { SharedModule } from './shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}
export const createTranslateLoader = (http: HttpClient) => {
  return new TranslateHttpLoader(http, './i18n/', '.json');
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    AuthModule,
	  AuthRoutingModule,
    UserModule,
    UserRoutingModule,
    BrowserModule,
    SharedModule,
    SharedRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    // AppRoutingModule,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
