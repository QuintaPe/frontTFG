import { Component, Input, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgClass, NgIf, UpperCasePipe } from '@angular/common';
import { CdkPortal } from '@angular/cdk/portal';
import environment from 'src/environments/environment';
import { SkeletonComponent } from '../skeleton/skeleton.component';
import { TruncatePipe } from '@app/shared/pipes/truncate.pipe';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
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
export class AvatarComponent {
  @Input() class: string = '';
  @Input() src: string = '';
  @Input() title: string = '';
  @Input() size: number = 30;
  @Input() loading: boolean = false;
  FILES_BASE_URL = environment.api.FILES_BASE_URL;

  @ViewChild(CdkPortal) public contentTemplate!: CdkPortal;
}
