import { Input, Component, inject, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MANAGER_ROUTES } from '@app/core/routes';
import { CampingService } from '@app/camping/services/camping.service';
import { DialogService } from '@app/shared/components/dialog/dialog.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-camping-row',
  templateUrl: './camping-row.component.html',
  styleUrls: ['./camping-row.component.scss']
})
export class CampingRowComponent {
  @Input() _id = '';
  @Input() name = '';
  @Input() description = '';
  @Input() createdAt = '';
  @Input() loading = false;
  @Output() onChange = new EventEmitter();

  private dialogService = inject(DialogService);
  private campingService = inject(CampingService);
  private translate = inject(TranslateService);
  private router = inject(Router);

  async handleDeleteCamping(event: Event) {
    event.stopPropagation();
    const deleteLiteral = this.translate.instant('campsite.deleteQuestion')
    const confirmed = this.dialogService.open('confirmDanger', deleteLiteral);
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
