import { Component, Type, inject } from '@angular/core';
import { ConversationService } from '@app/core/services/conversation.service';
import { ConversationRowComponent } from '@app/user/pages/user-conversations/conversation-row/conversation-row.component';

@Component({
  selector: 'app-admin-conversations',
  templateUrl: './admin-conversations.component.html',
  styleUrls: ['./admin-conversations.component.scss']
})

export class AdminConversationsComponent {
  private conversationService = inject(ConversationService);

  protected messageRowType: Type<any> = ConversationRowComponent
  protected componentInputs = ['_id', 'participants'];
  protected externalInputs:any = { modelId: null };

  getConversations = async (page:any, size:any, search:any, filters:any, sort:any) => {
    return await this.conversationService.getConversations('User', null, {
      page, size, search, filters, sort,
    })
  }
}

