import { Component, OnInit, Input, inject } from '@angular/core';
import { ConversationService } from '@app/core/services/conversation.service';
import { formatDate, getFullName } from '@utils/functions';

@Component({
  selector: 'app-user-conversation',
  templateUrl: './user-conversation.component.html',
  styleUrls: ['./user-conversation.component.scss']
})

export class UserConversationComponent implements OnInit {
  @Input() id = '';
  protected conversation: any;
  protected messages:any = Array(10).fill({ sender: null, loading: true });
  protected message = '';
  protected loading = true;

  private conversationService = inject(ConversationService);
  protected getFullName = getFullName;
  protected formatDate = formatDate;

  async ngOnInit() {
   const { messages, conversation } = await this.conversationService.getConversation(this.id);
   this.conversation = conversation;
   this.messages = messages;
   this.loading = false;
  }

  async sendMessage() {
    const auxMessage = await this.conversationService.sendMessage(this.id, this.message);
    this.messages.unshift(auxMessage);
  }
}

