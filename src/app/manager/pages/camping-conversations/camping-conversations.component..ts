import { Component, Input, OnInit, Type, inject } from '@angular/core';
import { ConversationService } from '@app/core/services/conversation.service';
import { ConversationRowComponent } from '@app/user/pages/user-conversations/conversation-row/conversation-row.component';

@Component({
  selector: 'app-camping-conversations',
  templateUrl: './camping-conversations.component.html',
  styleUrls: ['./camping-conversations.component.scss']
})

export class CampingConversationsComponent implements OnInit {
  @Input() id: string = ''
  private conversationService = inject(ConversationService);

  protected messageRowType: Type<any> = ConversationRowComponent
  protected componentInputs = ['_id', 'participants', 'subject', 'lastMessage', 'lastMessageSeen'];
  protected externalInputs:any;

  ngOnInit(): void {
    this.externalInputs = { modelId: this.id };
  }

  getConversations = async (page:any, size:any, search:any, filters:any, sort:any) => {
    return await this.conversationService.getConversations('Camping', this.id, 'opened', {
      page, size, search, filters, sort,
    })
  }
}

