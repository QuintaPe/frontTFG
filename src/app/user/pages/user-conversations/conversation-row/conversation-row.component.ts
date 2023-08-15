import { NgIf } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AvatarComponent } from '@app/shared/components/Avatar/avatar.component';
import { SkeletonComponent } from '@app/shared/components/skeleton/skeleton.component';
import { TranslateService } from '@ngx-translate/core';
import { getFullName } from '@utils/functions';


@Component({
  selector: 'app-conversation-row',
  templateUrl: './conversation-row.component.html',
  styleUrls: ['./conversation-row.component.scss'],
  standalone: true,
  imports: [SkeletonComponent, NgIf, AvatarComponent, RouterModule],
})

export class ConversationRowComponent implements OnInit {
  @Input() _id = '';
  @Input() participants:any[] = [];
  @Input() modelId:any[] = [];
  @Input() lastMessage:any;
  @Input() lastMessageSeen:any;
  @Input() loading = false;

  protected type: string;
  protected receiver: any;
  protected getFullName = getFullName;
  protected translateService = inject(TranslateService)

  ngOnInit() {
    const aux = this.participants.find(par => par.id !== this.modelId);
    this.type = aux?.type;
    this.receiver = aux?.id;
  }

  get receiverName() {
    if (this.type === 'User') {
      return this.receiver ? getFullName(this.receiver?.attributes) : this.translateService.instant('user.roles.admin')
    }
    return this.receiver?.name || ''
  }

  get receiverAvatar() {
    if (this.type === 'User') {
      return this.receiver ? this. receiver.attributes?.avatar?._id : null
    }
    return this.receiver?.images?.[0]?._id
  }
}

