import { Inject } from '@angular/core';
import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '../button/button.component';
import { NgIf } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';

@Component({
    selector: 'app-dialog',
    templateUrl: 'dialog.component.html',
    styleUrls: ['dialog.component.scss'],
    standalone: true,
    imports: [ButtonComponent, TranslateModule, NgIf, LoaderComponent]
})

export class DialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    dialogRef.backdropClick().subscribe(() => {
      dialogRef.close(false);
    })
  }

  close(res?: boolean) {
    this.dialogRef.close(res);
  }
}
