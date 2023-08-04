import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { SkeletonComponent } from '../../skeleton/skeleton.component';
import { NgClass, NgIf } from '@angular/common';

@Component({
    selector: 'app-input-text-area',
    templateUrl: './input-text-area.component.html',
    styleUrls: ['./input-text-area.component.scss'],
    standalone: true,
    imports: [NgIf, NgClass, SkeletonComponent, MatIconModule, ReactiveFormsModule, FormsModule]
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
  @Input() control: any = null;
  @Input() name: string = '';
  @Input() error: string = '';
  @Input() loading:boolean = false;
  @Output() valueChange = new EventEmitter<string>();


  constructor() {}

  emitEvent() {
    this.valueChange.emit(this.value || '');
  }
}
