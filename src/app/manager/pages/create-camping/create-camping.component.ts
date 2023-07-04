import { inject, Input, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { Camping } from '@models/camping';
import { MANAGER_ROUTES } from '@app/core/routes';
import { TranslateService } from '@ngx-translate/core';
import { CampingService } from '@app/camping/services/camping.service';

@Component({
  selector: 'app-create-camping',
  templateUrl: './create-camping.component.html',
  styleUrls: ['./create-camping.component.scss']
})

export class CreateCampingComponent implements OnInit {
  @Input() id: string = ''
  protected camping: Camping = new Camping();
  protected page = 0;
  protected loading = false;

  private campingService = inject(CampingService);
  private router = inject(Router);
  private viewport = inject(ViewportScroller);
  protected translate = inject(TranslateService);

  ngOnInit(): void {
    if (this.id) {
      (async () => {
        this.loading = true;
        this.camping = await this.campingService.getFullCamping(this.id);
        this.loading = false;
      })();
    }
  }

  getPageName() {
    switch(this.page) {
      case 0: return 'info';
      case 1: return 'location';
      case 2: return 'lodgings';
      case 3: return 'images';
      default: return '';
    }
  }
  breadcrumb = [
    { name: this.translate.instant('campsite.campsites'), route: MANAGER_ROUTES.CAMPINGS.url },
    { name: this.translate.instant('campsite.createCampsite') },
    { name: this.translate.instant(`campsite.${this.getPageName()}`) },
  ];

  pageBack() {
    if (this.page > 0) {
      this.page -= 1;
    }
  }

  async handleSubmit() {
    if (this.page > 2) {
      this.loading = true;
      try {
        if (this.id) {
          await this.campingService.putCamping(this.camping);
        } else {
          await this.campingService.postCamping(this.camping);
        }
        this.router.navigateByUrl(MANAGER_ROUTES.CAMPINGS.url);
      } catch (err) {
        this.loading = false
        throw err;
      }
    } else {
      this.page += 1;
      this.viewport.scrollToPosition([0, 0]);
    }
  }
}
