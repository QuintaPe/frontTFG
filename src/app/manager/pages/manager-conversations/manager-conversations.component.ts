import { Component, Type, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ConversationService } from '@app/core/services/conversation.service';
import { ConversationRowComponent } from '@app/user/pages/user-conversations/conversation-row/conversation-row.component';
import { MANAGER_ROUTES } from '@app/core/routes';
import { AuthService } from '@app/auth/services/auth.service';
import { DialogService } from '@app/shared/components/dialog/dialog.service';

@Component({
  selector: 'app-manager-conversations',
  templateUrl: './manager-conversations.component.html',
  styleUrls: ['./manager-conversations.component.scss']
})

export class ManagerConversationsComponent {
  private conversationService = inject(ConversationService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private dialogService = inject(DialogService);

  protected messageRowType: Type<any> = ConversationRowComponent
  protected componentInputs = ['_id', 'participants', 'subject', 'lastMessage', 'lastMessageSeen'];
  protected externalInputs = { modelId: this.authService.user._id};

  startChatWithAdmin = async () => {
    const ref = this.dialogService.openLoading();
      try {
        const conversation =  await this.conversationService.createConversation('User');
        this.router.navigateByUrl(MANAGER_ROUTES.setConversation(conversation._id))
      } catch (err) {
        await this.dialogService.open('danger', 'Error');
      }
      ref.close();
  }

  getConversations = async (page:any, size:any, search:any, filters:any, sort:any) => {
    return await this.conversationService.getConversations('User', this.authService.user._id, 'opened', {
      page, size, search, filters, sort,
    })
  }
}

