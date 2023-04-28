import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-text-area',
  templateUrl: './input-text-area.component.html',
  styleUrls: ['./input-text-area.component.scss']
})

export class InputTextAreaComponent {
  @Input() minHeight:number = 150;
  @Input() class:string = '';
  @Input() icon:string = '';
  @Input() preText:string = '';
  @Input() placeholder:string = '';
  @Input() isRequired:boolean = false;
  @Input() isDisabled:boolean = false;
  @Input() value: string = '';
  @Input() name: string = '';
  @Input() error: string = '';
  @Input() loading:boolean = false;
  @Output() valueChange = new EventEmitter<string>();


  constructor() {}

  emitEvent() {
    this.valueChange.emit(this.value || '');
  }
}
