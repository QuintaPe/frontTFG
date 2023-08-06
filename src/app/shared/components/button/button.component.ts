import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { SkeletonComponent } from '../skeleton/skeleton.component';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    standalone: true,
    imports: [NgIf, MatIconModule, SkeletonComponent, FormsModule]
})
export class ButtonComponent implements OnInit {
  @Input() text: String = '';
  @Input() color: String = 'primary';
  @Input() type: String = 'button';
  @Input() disabled: Boolean = false;
  @Input() loading: Boolean = false;
  @Input() size: String  = '';
  @Input() class: String = '';
  @Input() icon: String = '';
  @Input() iconRight: String = '';
  @Input() style?: Object;
  @Input() number: number | null = null;
  @Output() onClick = new EventEmitter<number>();

  inputNumber: number;
  validTypes: String[] = ['submit', 'reset', 'button'];
  classes?:string;

  constructor() {}

  ngOnInit(): void {
    this.inputNumber = this.number !== null ? this.number : 0;
    this.classes = `button-app btn btn-${this.color} ${this.size ? `btn-${this.size}` : ''}
      ${this.class} ${this.icon ? 'btn-icon' : ''} ${this.iconRight ? 'btn-icon-right' : ''}`;
  }

  handleInputFocus(event: FocusEvent) {
    event.stopPropagation();
  }

  emitEvent() {
    if (!this.loading && !this.disabled) {
      this.onClick.emit(this.inputNumber);
    }
  }
}
