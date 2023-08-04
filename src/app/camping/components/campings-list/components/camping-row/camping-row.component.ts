import { Input, Component, OnInit, Output, EventEmitter, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CampingService } from '@app/camping/services/camping.service';
import { MANAGER_ROUTES } from '@app/core/routes';
import { DialogService } from '@app/shared/components/dialog/dialog.service';
import { TranslateService } from '@ngx-translate/core';
import environment from 'src/environments/environment';

@Component({
  selector: 'app-camping-row',
  templateUrl: './camping-row.component.html',
  styleUrls: ['./camping-row.component.scss']
})
export class CampingRowComponent implements OnInit{
  @Input() _id = '';
  @Input() name = '';
  @Input() description = '';
  @Input() images: any = [];
  @Input() location: any = {}
  @Input() createdAt = '';
  @Input() distance = '';
  @Input() ratings:any = null;
  @Input() relation:any = null;
  @Input() entryDate:string = '';
  @Input() exitDate:string = '';
  @Input() totalCapacity:number = 0;
  @Input() availableCapacity:number = 0;
  @Input() loading = false;
  @Input() canEdit = false;
  @Output() onChange = new EventEmitter();

  protected image = ''
  protected loadingFavorite = false;
  private campingService = inject(CampingService);
  private dialogService = inject(DialogService);
  private translate = inject(TranslateService);
  private router = inject(Router);


  ngOnInit() {
    if (this.images.length) {
      this.image = environment.api.FILES_BASE_URL + this.images[0];
    }
  }

  async toggleFavorite(e: any) {
    e.stopPropagation();
    const favorite = !this.relation?.favorite;
    this.loadingFavorite = true;
    this.relation = await this.campingService.createCampingRelation(this._id, { favorite })
    this.loadingFavorite = false;
  }

  async handleDeleteCamping(event: Event) {
    event.stopPropagation();
    const deleteLiteral = this.translate.instant('campsite.deleteQuestion')
    const confirmed = await this.dialogService.open('confirmDanger', deleteLiteral);
    if (confirmed) {
      try {
        const ref = this.dialogService.openLoading();
        await this.campingService.deleteCamping(this._id);
        ref.close();
        this.onChange.emit();
      } catch (err) {}
    }
  }

  handleEditCamping(event: Event) {
    event.stopPropagation();
    this.router.navigateByUrl(MANAGER_ROUTES.setEditCamping(this._id));
  }
}
