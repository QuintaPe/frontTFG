import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { SkeletonComponent } from '../skeleton/skeleton.component';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    standalone: true,
    imports: [NgIf, MatIconModule, SkeletonComponent]
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
  @Output() onClick = new EventEmitter<String>();

  validTypes: String[] = ['submit', 'reset', 'button'];
  classes?:string;

  constructor() {}

  ngOnInit(): void {
    this.classes = `button-app btn btn-${this.color} ${this.size ? `btn-${this.size}` : ''}
      ${this.class} ${this.icon ? 'btn-icon' : ''} ${this.iconRight ? 'btn-icon-right' : ''}`;
  }

  emitEvent() {
    if (!this.loading && !this.disabled) {
      this.onClick.emit();
    }
  }
}
