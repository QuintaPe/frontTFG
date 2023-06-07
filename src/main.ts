import { enableProdMode, APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import { withInterceptorsFromDi, provideHttpClient, HttpClient } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import environment from './environments/environment';

// Modules
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { JwtModule } from '@auth0/angular-jwt';

// App
import { AppComponent } from './app/app.component';
import { APP_ROUTES } from './app/app.routes';
import { AuthService } from './app/auth/services/auth.service';
import { provideRouter } from '@angular/router';

import { GALLERY_CONFIG } from 'ng-gallery';

if (environment.production) {
  enableProdMode();
}

const initApp = (authService: AuthService) => {
  return () => authService.isUserAuth
    ? authService.setLoggedUser()
    : Promise.resolve();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: () => localStorage.getItem('access_token'),
          allowedDomains: ['localhost:4200'],
          disallowedRoutes: [''],
        },
      }),

      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: (http: HttpClient) => new TranslateHttpLoader(http, './i18n/', '.json'),
          deps: [HttpClient],
        },
      }),
    ),
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      multi: true,
      deps: [AuthService],
    },
    {
      provide: GALLERY_CONFIG,
      useValue: {
        dots: true,
        imageSize: 'cover'
      }
    },
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(APP_ROUTES),
  ],
}).catch((err) => console.error(err));
