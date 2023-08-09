import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-review-row',
  templateUrl: './review-row.component.html',
  styleUrls: ['./review-row.component.scss'],
})

export class ReviewRowComponent {
  @Input() reviews!: any;
  @Input() loading!: boolean;
  @Input() loadingItems!: number;

  get reviewsArray () {
    const aux = [...this.reviews];
    if (this.loading) {
      aux.push(...Array.from({ length: this.loadingItems }).map(() => ({ loading: true })));
    }
    return aux;
  }
}
