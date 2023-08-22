import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, HostListener } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { SkeletonComponent } from '../../skeleton/skeleton.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-input-text',
    templateUrl: './input-text.component.html',
    styleUrls: ['../inputs.component.scss'],
    standalone: true,
    imports: [CommonModule, SkeletonComponent, MatIconModule, ReactiveFormsModule, FormsModule]
})

export class InputTextComponent implements OnChanges {
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


  onInputWheel() {
    this.value = this.value;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.type === "date" && changes['value'] && this.value) {
      this.value = this.value.split('T')[0];
    }
  }

  emitEvent() {
    this.valueChange.emit(this.value || '');
  }

  preventNonNumericalInput(e: any) {
    if (this.type === 'number') {
      var charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
      var charStr = String.fromCharCode(charCode);

      if (!charStr.match(/^[-+]?\d*(,\d*)?$/)) {
        e.preventDefault();
      }
    }
  }
}
