import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from "./auth/services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontEnd';
  langs: string[] = [];

  constructor(
    public router: Router,
    public translate: TranslateService
  ) {
    this.translate.setDefaultLang('es');
    this.translate.use('es');
    this.translate.addLangs(['es', 'en']);
    this.langs = this.translate.getLangs();
  }

  changeLang = (lang: string) => {
    this.translate.use(lang);
  }
}
