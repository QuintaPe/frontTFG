import { Injectable, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { DialogComponent } from './dialog.component';

@Injectable()
export class DialogService {
  dialog = inject(MatDialog);

  async open(type: string, text: string): Promise<boolean> {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { text, type },
    });

    return firstValueFrom(dialogRef.afterClosed());
  }

  openLoading(): MatDialogRef<DialogComponent, any> {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { text: '', type: 'loading' },
    });

    return dialogRef;
  }
}
