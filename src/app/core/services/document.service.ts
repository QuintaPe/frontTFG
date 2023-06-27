import { Injectable } from "@angular/core";
import { fetch } from "@utils/api";

@Injectable({
  providedIn: "root",
})

export class DocumentService {
  uploadDocument(document: File, _public: boolean, opts: any = {}) {
    return fetch('POST', 'documents', { document, public: _public, ...opts }, true);
  }

  downloadDocument(id: String) {
    return fetch('GET', `documents/${id}`);
  }
}
