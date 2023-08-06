import { Component, Inject, TemplateRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgTemplateOutlet } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-popup',
    templateUrl: 'popup.component.html',
    styleUrls: ['popup.component.scss'],
    standalone: true,
    imports: [MatIconModule, NgTemplateOutlet]
})

export class PopupComponent {
  constructor(
    public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      headerText: string;
      template: TemplateRef<any>;
    }
  ) {
    dialogRef.disableClose = true;
  }

  close(res: boolean) {
    this.dialogRef.close(res);
  }
}
