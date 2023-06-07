import { Input, Component, inject, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CAMPINGS_MANAGEMENT_ROUTES } from '@app/core/routes';
import { CampingService } from '@app/camping/services/camping.service';
import { DialogService } from '@app/shared/components/dialog/dialog.service';

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
  private router = inject(Router);

  async handleDeleteCamping(event: Event) {
    event.stopPropagation();
    const confirmed = await this.dialogService.openConfirm('Are you sure?');
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
    this.router.navigateByUrl(CAMPINGS_MANAGEMENT_ROUTES.setEditCamping(this._id));
  }
}
