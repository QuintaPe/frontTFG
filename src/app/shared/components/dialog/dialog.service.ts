import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { DialogComponent } from './dialog.component';

@Injectable()
export class DialogService {
  dialog = inject(MatDialog);

  async open(text: string, type: string): Promise<boolean> {
    let dialogRef;

    switch (type) {
      case 'confirm':
        dialogRef = this.dialog.open(DialogComponent, {
          data: { text, type },
          panelClass: 'confirm-dialog'
        });
        break;
      case 'confirmDanger':
        dialogRef = this.dialog.open(DialogComponent, {
          data: { text, type },
          panelClass: 'confirm-danger-dialog'
        });
        break;
      case 'alert':
        dialogRef = this.dialog.open(DialogComponent, {
          data: { text, type },
          panelClass: 'alert-dialog'
        });
        break;
      default:
        throw new Error(`Invalid dialog type: ${type}`);
    }

    return await firstValueFrom(dialogRef.afterClosed());
  }

}
