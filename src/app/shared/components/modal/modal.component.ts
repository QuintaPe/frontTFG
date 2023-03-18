import { Component } from '@angular/core';
// import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-modal',
    templateUrl: 'modal.component.html',
    styleUrls: ['modal.component.scss'],
})

export class DialogComponent {
//   constructor(public dialogRef: MatDialogRef<DialogComponent>) {}

  close() {
    // this.dialogRef.close();
  }
}
