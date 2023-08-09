import { NgClass, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { AvatarComponent } from '@shared/components/Avatar/avatar.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { AuthService } from '@auth/services/auth.service';
import { AUTH_ROUTES } from '@app/core/routes';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSelectorComponent } from '../language-selector/language-selector.component';
import { ROLES } from '@utils/constants';
import { filter } from 'rxjs/operators';
import { MatIcon, MatIconModule } from '@angular/material/icon';

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
    NgClass,
    TranslateModule,
    LanguageSelectorComponent,
    MatIconModule,
  ],
})
export class NavBarComponent {
  protected LOGIN_URL = AUTH_ROUTES.LOGIN.url;
  protected SIGNUP_URL = AUTH_ROUTES.SIGNUP.url;

  protected router = inject(Router);
  protected authService = inject(AuthService);
  protected isRole = false;

  ngOnInit(): void {
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const firstParam = event.urlAfterRedirects.split('/')?.[1] || '';
      this.isRole = ROLES.includes(firstParam);
    });
  }

  logout = () => {
    this.authService.logout();
    this.router.navigateByUrl(this.LOGIN_URL);
  };
}
