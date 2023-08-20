import { Component, Input, Type, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ConversationService } from '@app/core/services/conversation.service';
import { ConversationRowComponent } from '@app/user/pages/user-conversations/conversation-row/conversation-row.component';
import { AuthService } from '@app/auth/services/auth.service';


@Component({
  selector: 'app-camping-conversations',
  templateUrl: './camping-conversations.component.html',
  styleUrls: ['./camping-conversations.component.scss']
})

export class CampingConversationsComponent {
  @Input() id: string = ''
  private conversationService = inject(ConversationService);
  private authService = inject(AuthService);
  private router = inject(Router);

  protected messageRowType: Type<any> = ConversationRowComponent
  protected componentInputs = ['_id', 'participants', 'subject', 'lastMessage', 'lastMessageSeen'];
  protected externalInputs = { modelId: this.authService.user._id};

  getConversations = async (page:any, size:any, search:any, filters:any, sort:any) => {
    return await this.conversationService.getConversations('Camping', this.id, 'opened', {
      page, size, search, filters, sort,
    })
  }
}

