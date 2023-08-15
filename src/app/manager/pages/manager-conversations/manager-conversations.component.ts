import { Component, Type, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ConversationService } from '@app/core/services/conversation.service';
import { ConversationRowComponent } from '@app/user/pages/user-conversations/conversation-row/conversation-row.component';
import { USER_ROUTES } from '@app/core/routes';
import { AuthService } from '@app/auth/services/auth.service';


@Component({
  selector: 'app-manager-conversations',
  templateUrl: './manager-conversations.component.html',
  styleUrls: ['./manager-conversations.component.scss']
})

export class ManagerConversationsComponent {
  private conversationService = inject(ConversationService);
  private authService = inject(AuthService);
  private router = inject(Router);

  protected messageRowType: Type<any> = ConversationRowComponent
  protected componentInputs = ['_id', 'participants', 'lastMessage', 'lastMessageSeen'];
  protected externalInputs = { modelId: this.authService.user._id};

  startChatWithAdmin = async () => {
    const conversation =  await this.conversationService.createConversation('User');
    this.router.navigateByUrl(USER_ROUTES.setConversation(conversation._id))
  }

  getConversations = async (page:any, size:any, search:any, filters:any, sort:any) => {
    return await this.conversationService.getConversations('User', this.authService.user._id, {
      page, size, search, filters, sort,
    })
  }
}

