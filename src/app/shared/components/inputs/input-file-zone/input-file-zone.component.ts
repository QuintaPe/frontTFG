import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DocumentService } from '@app/shared/services/document.service';
import { TranslateService } from '@ngx-translate/core';
import { apiEnviroment } from 'src/environments/environment';

@Component({
  selector: 'app-input-file-zone',
  templateUrl: './input-file-zone.component.html',
  styleUrls: ['./input-file-zone.component.scss']
})

export class InputFileZoneComponent{
  @Input() class:string = '';
  @Input() preText:string = '';
  @Input() value: any = null;
  @Input() isRequired:boolean = false;
  @Input() isDisabled:boolean = false;
  @Input() isPublic: boolean = false;
  @Input() isMultiple: boolean = false;
  @Output() valueChange = new EventEmitter<any>();

  uploading = 0;
  file: any = null
  FILES_BASE_URL = apiEnviroment.FILES_BASE_URL

  constructor(
    public documentService: DocumentService,
    public translate: TranslateService,
  ) {}

  changeValue = async (e:any, isDrop = false) => {
    const fileData = isDrop ? e : e.target.files[0];
    this.uploading += 1;

    try {
      const fileInfo = await this.documentService.uploadDocument(fileData, this.isPublic);
      this.file = fileInfo;
      this.valueChange.emit(this.isMultiple ? [...this.value, fileInfo] : fileInfo);
    } catch  {}

    this.uploading -= 1;
  };

  removeValue(id: string) {
    this.valueChange.emit(this.value.filter((val: any) => val._id !== id));
  }

  onDropped(event: CdkDragDrop<any>) {
    const { previousIndex, currentIndex } = event;
    moveItemInArray(this.value, previousIndex, currentIndex);
  }
}
