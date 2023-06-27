import { Component, OnInit, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { AuthService } from './auth/services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    // styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [NavBarComponent, RouterOutlet]
})
export class AppComponent implements OnInit {
  title = 'ScoutCamp';
  langs: string[] = ['es', 'en'];

  private translate = inject(TranslateService);
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.translate.setDefaultLang('es');
    this.translate.use(this.authService.user?.lang|| this.translate.getBrowserLang() || 'es');
    this.translate.addLangs(this.langs);
  }

  changeLang = (lang: string) => {
    this.translate.use(lang);
  }
}
