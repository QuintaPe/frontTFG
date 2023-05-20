import { Input, Component, inject } from '@angular/core';
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

  private dialogService = inject(DialogService);
  private campingService = inject(CampingService);
  private router = inject(Router);

  async handleDeleteCamping(event: Event) {
    event.stopPropagation();
    const confirmed = await this.dialogService.openConfirm('Are you sure?');
    if (confirmed) {
      try {
        await this.campingService.deleteCamping(this._id);
      } catch (err) {}
    }
  }

  handleEditCamping(event: Event) {
    event.stopPropagation();
    this.router.navigateByUrl(CAMPINGS_MANAGEMENT_ROUTES.setEditCamping(this._id));
  }
}
