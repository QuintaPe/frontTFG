import { CdkDragDrop, moveItemInArray, CdkDropList, CdkDrag } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { DocumentService } from '@core/services/document.service';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import environment from 'src/environments/environment';
import { SkeletonComponent } from '../../skeleton/skeleton.component';
import { MatIconModule } from '@angular/material/icon';
import { FileDragNDropDirective } from './file-drag-drop.directive';
import { NgClass, NgIf, NgFor } from '@angular/common';

@Component({
    selector: 'app-input-file-zone',
    templateUrl: './input-file-zone.component.html',
    styleUrls: ['./input-file-zone.component.scss'],
    standalone: true,
    imports: [NgClass, FileDragNDropDirective, NgIf, CdkDropList, NgFor, CdkDrag, MatIconModule, SkeletonComponent, TranslateModule]
})

export class InputFileZoneComponent{
  @Input() class:string = '';
  @Input() preText:string = '';
  @Input() value: any = null;
  @Input() control: any = null;
  @Input() isRequired:boolean = false;
  @Input() isDisabled:boolean = false;
  @Input() isPublic: boolean = false;
  @Input() isMultiple: boolean = false;
  @Input() isLoading: boolean = false;
  @Output() valueChange = new EventEmitter<any>();

  uploading = 0;
  file: any = null
  FILES_BASE_URL = environment.api.FILES_BASE_URL

  public documentService = inject(DocumentService);
  public translate = inject(TranslateService);

  get filesToShow(): any[] {
    return this.control?.value || this.value || [];
  }

  get loadingPlaceholders(): any[] {
    return Array(this.isLoading ? 3 : this.uploading).fill(undefined);
  }

  get loadingImagesStartIndex(): number {
    return this.filesToShow.length;
  }

  getDisplayIndex(file: any): number {
    const index = this.filesToShow.indexOf(file);
    return index !== -1 ? index + 1 : 0;
  }

  changeValue = async (event: any, isDrop = false): Promise<void> => {
    try {
      const fileData = isDrop ? event : event.target.files[0];

      if (fileData) {
        this.uploading += 1;

        const fileInfo = await this.documentService.uploadDocument(fileData, this.isPublic);
        this.file = !this.isMultiple ? fileInfo : null;

        if (this.control) {
          const updatedControlValue = this.isMultiple
            ? [...this.control.value, fileInfo]
            : fileInfo;

          this.control.setValue(updatedControlValue);
        } else {
          const updatedValue = this.isMultiple
            ? [...this.value, fileInfo]
            : fileInfo;

          this.valueChange.emit(updatedValue);
        }

        this.uploading -= 1;
      }
    } catch (error) {
      console.error('Error occurred during file upload:', error);
    }
  };

  removeValue = (id: string): void => {
    if (this.control) {
      const updatedControlValue = this.control.value.filter((val: any) => val._id !== id);
      this.control.setValue(updatedControlValue);
    } else {
      const updatedValue = this.value.filter((val: any) => val._id !== id);
      this.valueChange.emit(updatedValue);
    }
  };

  onDropped(event: CdkDragDrop<any>) {
    const { previousIndex, currentIndex } = event;
    moveItemInArray(this.value, previousIndex, currentIndex);
  }
}
