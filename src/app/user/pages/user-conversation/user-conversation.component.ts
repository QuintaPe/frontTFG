import { Component, OnInit, Input, inject } from '@angular/core';
import { AuthService } from '@app/auth/services/auth.service';
import { ConversationService } from '@app/core/services/conversation.service';
import { TranslateService } from '@ngx-translate/core';
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
  protected receiver: any;
  protected loading = true;
  protected sending = false;
  protected disabledSubject = false
  protected breadcrumb: any;

  private translate = inject(TranslateService);
  private conversationService = inject(ConversationService);
  private authService = inject(AuthService);
  protected getFullName = getFullName;
  protected formatDate = formatDate;

  private setBreadcrumb(receiverName: string) {
    this.breadcrumb = [
      { name: this.translate.instant('internalMail.internalMail'), route: `${this.authService.user.role}/conversations` },
      { name: receiverName },
    ];
  }

  async ngOnInit() {
   this.setBreadcrumb('')
   const { messages, conversation } = await this.conversationService.getConversation(this.id);
   this.conversation = conversation;
   this.messages = messages;
   this.subject = conversation.subject;
   this.receiver = conversation.participants.find((p: any) => p?.id?._id !== conversation?.participant?._id).id;
   this.loading = false;
   this.disabledSubject = conversation?.status !== 'pending';
   const receiverName = this.receiver
    ? this.receiver.name || getFullName(this.receiver.attributes)
    : this.translate.instant('user.roles.admin');
   this.setBreadcrumb(receiverName)
   this.translate.onLangChange.subscribe(() => this.setBreadcrumb(receiverName));

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

