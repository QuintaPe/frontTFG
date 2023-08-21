import { Component, Input, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgClass, NgIf, UpperCasePipe } from '@angular/common';
import { CdkPortal } from '@angular/cdk/portal';
import environment from 'src/environments/environment';
import { SkeletonComponent } from '../skeleton/skeleton.component';
import { TruncatePipe } from '@app/shared/pipes/truncate.pipe';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    MatIconModule,
    SkeletonComponent,
    UpperCasePipe,
    TruncatePipe,
  ],
})
export class AlertComponent {
  @Input() message: string = '';
}
