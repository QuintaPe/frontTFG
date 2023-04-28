import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['../inputs.component.scss']
})

export class InputTextComponent implements OnInit {
  @Input() type:string = 'text';
  @Input() class:string = '';
  @Input() icon:string = '';
  @Input() preText:string = '';
  @Input() placeholder:string = '';
  @Input() isRequired:boolean = false;
  @Input() isDisabled:boolean = false;
  @Input() value: any = '';
  @Input() name: string = '';
  @Input() error: string = '';
  @Input() control: any = null;
  @Input() loading: boolean = false;
  @Output() valueChange = new EventEmitter<any>();


  constructor() {}

  ngOnInit(): void {
    if (this.type === "date") {
      this.value = this.value.split('T')[0];
    }
  }

  emitEvent() {
    this.valueChange.emit(this.value || '');
  }
}
