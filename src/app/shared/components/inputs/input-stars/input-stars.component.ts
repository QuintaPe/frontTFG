import { CommonModule } from '@angular/common';
import { Component, Output, Input, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-input-stars',
  templateUrl: './input-stars.component.html',
  styleUrls: ['./input-stars.component.scss'],
  standalone: true,
  imports: [MatIconModule, CommonModule]
})
export class InputStarsComponent {
  @Input() disabled = false;
  @Input() value: number = 1;
  @Input() size: number = 30;
  @Output() valueChange = new EventEmitter<any>();

  stars: boolean[] = Array(5).fill(true);

  ngOnInit() {
    if (this.value < 1 || this.value > 5) {
      this.value = this.value < 1 ? 1 : 5;
      this.valueChange.emit(this.value);
    }
  }
 }
