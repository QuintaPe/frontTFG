import {
  Component,
  ViewChild,
  inject,
  TemplateRef,
  Input,
  OnInit,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PopupComponent } from '@app/shared/components/popup/popup.component';
import { MatDialog } from '@angular/material/dialog';
import { CampingService } from '@app/camping/services/camping.service';

@Component({
  selector: 'app-camping-view-review',
  templateUrl: './camping-view-review.component.html',
  styleUrls: ['./camping-view-review.component.scss'],
})
export class CampingViewReviewsComponent implements OnInit {
  @Input() camping: string = '';
  @Input() images!: any[];

  private translate = inject(TranslateService);
  protected dialog = inject(MatDialog);
  protected campingService = inject(CampingService);

  protected RELATIONS_SIZE = 10;
  protected page = 0;

  protected loading = true;
  protected reviews: any = { items: [], total: 2 };
  protected loadingPopup = true;
  protected reviewsPopup: any = [];
  @ViewChild('reviewsTemplate') reviewsTemplate!: TemplateRef<any>;

  async ngOnInit() {
    this.reviews = await this.campingService.getCampingReviews(this.camping, {
      size: 2,
    });
    this.loading = false;
  }

  protected async fetchRelations(next = true) {
    if (next) {
      this.page += 1;
    }
    this.loadingPopup = true;
    const newRelations = await this.campingService.getCampingReviews(this.camping, {
      size: this.RELATIONS_SIZE,
      page: this.page,
    });
    this.reviewsPopup.push(...newRelations.items);;
    this.loadingPopup = false;
  }

  async openReviewsPopup() {
    this.dialog.open(PopupComponent, {
      data: {
        headerText: this.translate.instant('campsite.reviews'),
        template: this.reviewsTemplate,
      },
      width: '80vw',
    });
    this.fetchRelations(false);
  }
}
