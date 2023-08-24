import { Component, Input, OnInit, inject } from '@angular/core';
import { MANAGER_ROUTES } from '@app/core/routes';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-camping-management',
  templateUrl: './camping-management.component.html',
  styleUrls: ['./camping-management.component.scss']
})
export class CampingManagementComponent implements OnInit {
  @Input() id: string = '';
  private translate = inject(TranslateService);

  protected tabs: string[];
  protected breadcrumb: any[];
  protected actualTab: number = 0;

  private setTabs() {
    this.tabs = [
      this.translate.instant('campsite.bookings'),
      this.translate.instant('internalMail.internalMail'),
    ];

    this.breadcrumb = [
      { name: this.translate.instant('campsite.campsites'), route: MANAGER_ROUTES.CAMPINGS.url },
      { name: this.tabs[this.actualTab] },
    ];
  }

  setActiveTab(index:number){
    this.actualTab = index;
    this.setTabs();
  }

  ngOnInit(): void {
    this.setTabs();
    this.translate.onLangChange.subscribe(() => this.setTabs());
  }
}
