import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DocumentService } from '@app/shared/services/document.service';
import { apiEnviroment } from 'src/environments/environment';

@Component({
  selector: 'app-input-avatar',
  templateUrl: './input-avatar.component.html',
  styleUrls: ['./input-avatar.component.scss']
})

export class InputAvatarComponent implements OnInit {
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
  FILES_BASE_URL = apiEnviroment.FILES_BASE_URL

  constructor(public documentService: DocumentService) {}

  ngOnInit(): void {
    if (!this.file && this.value) {
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
    } catch (errors) {
      console.log(errors);
    }

    this.uploading = false;
  };

  removeValue = () => {
    this.uploading = false;
    this.file = null
    this.valueChange.emit(null);
  };

  
  emitEvent() {
    this.valueChange.emit(this.value || '');
  }
}
          