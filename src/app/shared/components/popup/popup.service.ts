import { Injectable, inject, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from './popup.component';

@Injectable()
export class PopupService {
  dialog = inject(MatDialog);

  open(headerText: string, template: TemplateRef<any>): void {
    this.dialog.open(PopupComponent, {
      data: { headerText, template },
      width: '80vw',
    });
  }
}
