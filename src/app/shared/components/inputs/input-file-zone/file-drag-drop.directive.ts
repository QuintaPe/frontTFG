import { Directive, HostListener, HostBinding, Output, EventEmitter, Input } from '@angular/core';

@Directive({
  selector: '[fileDragDrop]'
})

export class FileDragNDropDirective {
  //@Input() private allowed_extensions : Array<string> = ['png', 'jpg', 'bmp'];
  @Output() private filesChangeEmiter : EventEmitter<File> = new EventEmitter();
  //@Output() private filesInvalidEmiter : EventEmitter<File[]> = new EventEmitter();
  @HostBinding('style') private style?: string
  
  constructor() { }

  @HostListener('dragover', ['$event']) public onDragOver(evt: any){
    evt.preventDefault();
    evt.stopPropagation();
    this.style = 'background: #7a877826;';
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(evt: any){
    evt.preventDefault();
    evt.stopPropagation();
    this.style = '';
  }

  @HostListener('drop', ['$event']) public onDrop(evt: any){
    evt.preventDefault();
    evt.stopPropagation();
    this.style = ''
    let files = evt.dataTransfer.files;
    let valid_files : Array<File> = files;
    console.log(valid_files);
    this.filesChangeEmiter.emit(valid_files[0]);
  }
}