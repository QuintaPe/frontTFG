import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { DocumentService } from '@core/services/document.service';
import environment from 'src/environments/environment';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-input-avatar',
    templateUrl: './input-avatar.component.html',
    styleUrls: ['./input-avatar.component.scss'],
    standalone: true,
    imports: [NgIf, MatIconModule]
})

export class InputAvatarComponent implements OnChanges {
  @Input() class:string = '';
  @Input() type:string = 'user';
  @Input() preText:string = '';
  @Input() size:number = 200;
  @Input() isRequired:boolean = false;
  @Input() isDisabled:boolean = false;
  @Input() isPublic:boolean = false;
  @Input() value: any = null;
  @Output() valueChange = new EventEmitter<any>();

  uploading = false;
  file: any = null
  FILES_BASE_URL = environment.api.FILES_BASE_URL

  constructor(public documentService: DocumentService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value'] && this.value && !this.file) {
      this.file = this.value;
    }
  }

  changeValue = async (e:any) => {
    const fileData = e.target.files[0];
    this.uploading = fileData;

    try {
      const fileInfo = await this.documentService.uploadDocument(fileData, this.isPublic);
      this.file = fileInfo;
      this.valueChange.emit(fileInfo);
    } catch  {}

    this.uploading = false;
  };

  removeValue = () => {
    this.uploading = false;
    this.file = null
    this.valueChange.emit(null);
  };
}
