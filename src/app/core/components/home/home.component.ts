import { Component, OnInit, inject, ViewEncapsulation } from '@angular/core';
import { CampingService } from '@app/camping/services/camping.service';
import { CampingSearcherComponent } from '@app/shared/components/camping-searcher/camping-searcher.component';
import { PanelComponent } from '@app/shared/components/panel/panel.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    PanelComponent,
    CampingSearcherComponent,
    TranslateModule,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  private campingService = inject(CampingService);
  constructor() {}

  ngOnInit(): void {}

  async a(v:any) {
    console.log(v);
    const campings = await this.campingService.getAvailableCampings(v.place, v.date, v.people, {});
    console.log(campings);
  }
}
