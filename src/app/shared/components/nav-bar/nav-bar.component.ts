import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AvatarComponent } from '@shared/components/Avatar/avatar.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { AuthService } from '@auth/services/auth.service';
import { AUTH_ROUTES } from '@app/core/routes';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSelectorComponent } from '../language-selector/language-selector.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  standalone: true,
  imports: [
    ButtonComponent,
    AvatarComponent,
    RouterLink,
    NgIf,
    TranslateModule,
    LanguageSelectorComponent,
  ],
})
export class NavBarComponent {
  protected LOGIN_URL = AUTH_ROUTES.LOGIN.url;
  protected SIGNUP_URL = AUTH_ROUTES.SIGNUP.url;

  protected router = inject(Router);
  protected authService = inject(AuthService);

  logout = () => {
    this.authService.logout();
    this.router.navigateByUrl(this.LOGIN_URL);
  };
}
