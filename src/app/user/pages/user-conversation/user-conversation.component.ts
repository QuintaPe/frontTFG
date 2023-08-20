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
  protected subject = '';
  protected message = '';
  protected loading = true;
  protected sending = false;
  protected disabledSubject = false

  private conversationService = inject(ConversationService);
  protected getFullName = getFullName;
  protected formatDate = formatDate;

  async ngOnInit() {
   const { messages, conversation } = await this.conversationService.getConversation(this.id);
   this.conversation = conversation;
   this.messages = messages;
   this.subject = conversation.subject;
   console.log(conversation);
   this.loading = false;
   this.disabledSubject = conversation?.status !== 'pending';
  }

  async sendMessage() {
    this.sending = true;
    const auxMessage = await this.conversationService.sendMessage(this.id, this.subject, this.message);
    this.messages.unshift(auxMessage);
    this.message = '';
    this.sending = false;
    this.disabledSubject = true;
  }
}

