import { Component, OnInit, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { AuthService } from './auth/services/auth.service';
import { NgClass, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ErrorService } from './core/services/errors.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    NavBarComponent,
    RouterOutlet,
    NgIf,
    NgClass,
    MatIconModule,
    TranslateModule,
  ],
})
export class AppComponent implements OnInit {
  title = 'ScoutCamp';
  langs: string[] = ['es', 'en', 'fr', 'de'];

  private translate = inject(TranslateService);
  private authService = inject(AuthService);
  protected errorService = inject(ErrorService);

  ngOnInit(): void {
    this.translate.setDefaultLang('en');
    this.translate.use(
      this.authService.user?.lang || this.translate.getBrowserLang() || 'es'
    );
    this.translate.addLangs(this.langs);
  }

  changeLang = (lang: string) => {
    this.translate.use(lang);
  };
}
