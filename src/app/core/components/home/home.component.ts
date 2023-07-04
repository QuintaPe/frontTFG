import { Component, inject, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CAMPINGS_ROUTES } from '@app/core/routes';
import { CampingSearcherComponent } from '@app/shared/components/camping-searcher/camping-searcher.component';
import { PanelComponent } from '@app/shared/components/panel/panel.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [PanelComponent, CampingSearcherComponent, TranslateModule],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent {
  private router = inject(Router);

  async navigateCampingList(v: any) {
    const params = [
      `lat=${v.lat || ''}`,
      `lng=${v.lng || ''}`,
      `type=${v.type || ''}`,
      `startDate=${v.startDate || ''}`,
      `endDate=${v.endDate || ''}`,
      `capacity=${v.capacity || ''}`,
    ].filter((elem) => !elem.endsWith("="));

    return this.router.navigateByUrl(CAMPINGS_ROUTES.CAMPINGS.url + (params.length ? `?${params.join('&')}` : ''))
  }
}
