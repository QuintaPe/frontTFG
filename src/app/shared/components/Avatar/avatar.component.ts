import { Component, Input, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgClass, NgIf } from '@angular/common';
import { CdkPortal } from '@angular/cdk/portal';
import environment from 'src/environments/environment';
import { SkeletonComponent } from '../skeleton/skeleton.component';

@Component({
    selector: 'app-avatar',
    templateUrl: './avatar.component.html',
    styleUrls: ['./avatar.component.scss'],
    standalone: true,
    imports: [NgClass, NgIf, MatIconModule, SkeletonComponent]
})

export class AvatarComponent {
  @Input() class: String = 'medium';
  @Input() src: string = '';
  @Input() title: String = '';
  @Input() type: String = 'User';
  @Input() size: number = 30;
  @Input() loading: boolean = false;
  FILES_BASE_URL = environment.api.FILES_BASE_URL;

  @ViewChild(CdkPortal) public contentTemplate!: CdkPortal;

}
