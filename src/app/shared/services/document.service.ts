import { Injectable } from "@angular/core";
import { ApiService } from "@app/shared/services/api.service";

@Injectable({
  providedIn: "root",
})

export class DocumentService {
  constructor(private apiService: ApiService) {}

  uploadDocument(document: File, _public: boolean, opts: any = {}) {
    return this.apiService.fetch('POST', 'documents', { document, public: _public, ...opts }, true);
  }

  downloadDocument(id: String) {
    return this.apiService.fetch('GET', `documents/${id}`);
  }
}
