import { CdkPortal } from '@angular/cdk/portal';
import { Component, Input, ViewChild } from '@angular/core';
import { apiEnviroment } from 'src/environments/environment';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent {
  @Input() class: String = 'medium';
  @Input() src: string = '';
  @Input() title: String = '';
  @Input() type: String = 'User';
  @Input() size: number = 30;
  FILES_BASE_URL = apiEnviroment.FILES_BASE_URL;
  
  @ViewChild(CdkPortal) public contentTemplate!: CdkPortal;
  constructor() { }

}
