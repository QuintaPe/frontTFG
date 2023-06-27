import { inject, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  protected camping: Camping = new Camping();
  protected page = 0;
  protected loading = false;

  private campingService = inject(CampingService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private viewport = inject(ViewportScroller);
  protected translate = inject(TranslateService);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      (async () => {
        this.loading = true;
        this.camping = await this.campingService.getFullCamping(id);
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
    { name: this.translate.instant('camping.campings'), route: MANAGER_ROUTES.CAMPINGS.url },
    { name: this.translate.instant('camping.createCamping') },
    { name: this.translate.instant(`camping.${this.getPageName()}`) },
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
        if (this.route.snapshot.paramMap.get('id')) {
          await this.campingService.putCamping(this.camping);
        } else {
          await this.campingService.postCamping(this.camping);
        }
        this.router.navigateByUrl(MANAGER_ROUTES.CAMPINGS.url);
      } catch (err) {
        throw err;
      }
    } else {
      this.page += 1;
      this.viewport.scrollToPosition([0, 0]);
    }
  }
}
