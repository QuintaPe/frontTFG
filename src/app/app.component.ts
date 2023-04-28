import { APP_INITIALIZER, ApplicationInitStatus, Component, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from "./auth/services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ScoutCamp';
  langs: string[] = ['es', 'en'];

  constructor(
    public translate: TranslateService,
    public authService: AuthService,
  ) {
    this.translate.setDefaultLang('es');
    this.translate.use(localStorage.getItem('lang') || this.translate.getBrowserLang() || 'es');
    this.translate.addLangs(this.langs);
  }

  changeLang = (lang: string) => {
    this.translate.use(lang);
  }
}
