import { Injectable } from "@angular/core";
import { fetch } from "@utils/api";

@Injectable({
  providedIn: "root",
})

export class ConversationService {
  getConversations(type: string, id: string, status: string, opts: any) {
    opts.filters.status = status
    return fetch('GET', 'conversations', { type, id, opts })
  }

  createConversation(type: string, id: string = null) {
    return fetch('POST', 'conversations', { type, id })
  }

  getConversation(id:string) {
    return fetch('GET', `conversations/${id}`)
  }

  sendMessage(id: string, subject: string, message: string) {
    return fetch('POST', `conversations/${id}`, { subject, message })
  }

}
