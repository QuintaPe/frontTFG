import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Camping } from '@models/camping';
import { TranslateService } from '@ngx-translate/core';
import { CampingService } from '@app/user/services/camping.service';
import { CAMPINGS_MANAGEMENT_ROUTES } from '@app/campingManagement/routes';
import { ActivatedRoute } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-create-camping',
  templateUrl: './create-camping.component.html',
  styleUrls: ['./create-camping.component.scss']
})

export class CreateCampingComponent implements OnInit {
  camping: Camping = new Camping();
  page = 0;
  loading = false;

  constructor(
    public campingService: CampingService,
    public translate: TranslateService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private viewport: ViewportScroller,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      (async () => {
        this.loading = true;
        this.camping = await this.campingService.getCamping(id);
        this.loading = false;
      })();
    }
  }

  getBreadcrumb() {
    let pageName = ''
    switch(this.page) {
      case 0: pageName = 'info'; break;
      case 1: pageName = 'location'; break;
      case 2: pageName = 'units'; break;
      case 3: pageName = 'images'; break;
    }
    return [
      { name: this.translate.instant('camping.campings'), route: CAMPINGS_MANAGEMENT_ROUTES.CAMPINGS },
      { name: this.translate.instant('camping.createCamping') },
      { name: this.translate.instant(`camping.${pageName}`) },
    ] ;
  }

  pageBack() {
    if (this.page > 0) {
      this.page -= 1;
    }
  }

  handleSubmit() {
    if (this.page > 5) {
      this.campingService.postCamping(this.camping)
       .then(response => console.log(response))
       .catch(err => console.log(err))
    } else {
      this.page += 1;
      this.viewport.scrollToPosition([0, 0]);
    }
  }

  setCamping(event: Camping) {
    this.camping.location = event.location;
    this.cd.detectChanges();
  }
}
