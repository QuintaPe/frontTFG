import { Component, Input, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgClass, NgIf } from '@angular/common';
import { CdkPortal } from '@angular/cdk/portal';
import environment from 'src/environments/environment';

@Component({
    selector: 'app-avatar',
    templateUrl: './avatar.component.html',
    styleUrls: ['./avatar.component.scss'],
    standalone: true,
    imports: [NgClass, NgIf, MatIconModule]
})

export class AvatarComponent {
  @Input() class: String = 'medium';
  @Input() src: string = '';
  @Input() title: String = '';
  @Input() type: String = 'User';
  @Input() size: number = 30;
  FILES_BASE_URL = environment.api.FILES_BASE_URL;

  @ViewChild(CdkPortal) public contentTemplate!: CdkPortal;

}
