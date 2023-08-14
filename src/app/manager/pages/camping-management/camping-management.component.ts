import { Component, Input, OnInit, inject } from '@angular/core';
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
  protected actualTab: number = 0;

  setActiveTab(index:number){
    this.actualTab = index;
  }

  setTabs():void {
    this.tabs = [
      this.translate.instant('common.table'),
      this.translate.instant('common.calendar'),
    ]
  }

  ngOnInit(): void {
    this.setTabs();
    this.translate.onLangChange.subscribe(this.setTabs());
  }
}
