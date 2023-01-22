import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss']
})

export class InputSelectComponent implements OnInit {
  @Input() class:string ='';
  @Input() icon:string ='';
  @Input() preText:string = '';
  @Input() placeholder:string = '';
  @Input() isRequired:boolean = false;
  @Input() isDisabled:boolean = false;
  @Input() value: string | null = '';
  @Input() name: string = '';
  @Input() error: string = '';
  @Input() control: any = null;
  @Input() options: Array<{id: string, name: string}> = [];
  @Output() valueChange = new EventEmitter<string>();
  private showOptions: Boolean = false;


  constructor() {}

  ngOnInit(): void {}
  
  emitEvent() {
    this.valueChange.emit(this.value || '');
  }

  get getShowOptions() {
    return this.showOptions;
  }
  
  get getValueName () {
    const option = this.options.find(opt => opt.id === this.value);
    return option ? option.name : `- ${this.placeholder} -`
  }

  setValue (value: string) {
    this.value = value;
    this.valueChange.emit(this.value || '')
  }

  changeShowOptions = () => {
    this.showOptions = !this.showOptions;
  }

  console = (option: String) => {
    console.log(this.value, option)
  }
}
