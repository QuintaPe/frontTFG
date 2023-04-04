import { Input } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-camping-row',
  templateUrl: './camping-row.component.html',
  styleUrls: ['./camping-row.component.scss']
})
export class CampingRowComponent {
  @Input() name = '';
  @Input() description = '';
  @Input() createdAt = '';
}
