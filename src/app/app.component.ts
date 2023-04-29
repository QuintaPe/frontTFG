import { Component, OnInit, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [NavBarComponent, RouterOutlet]
})
export class AppComponent implements OnInit {
  title = 'ScoutCamp';
  langs: string[] = ['es', 'en'];

  translate = inject(TranslateService);

  ngOnInit(): void {
    this.translate.setDefaultLang('es');
    this.translate.use(localStorage.getItem('lang') || this.translate.getBrowserLang() || 'es');
    this.translate.addLangs(this.langs);
  }

  changeLang = (lang: string) => {
    this.translate.use(lang);
  }
}
