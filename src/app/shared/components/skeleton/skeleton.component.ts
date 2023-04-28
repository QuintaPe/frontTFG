import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss']
})
export class SkeletonComponent {
  @Input() class: String = '';
  @Input() animation: String = 'wave';
  @Input() width: String | number = '100%';
  @Input() height: String = '18px';
  @Input() variant: String = 'rectangular';

  constructor() { }

  getWidth() {
    return typeof this.width === 'number'
      ? `${this.width}%`
      : this.width
  }

  getHeight() {
    return typeof this.height === 'number'
      ? `${this.height}%`
      : this.height
  }


}
