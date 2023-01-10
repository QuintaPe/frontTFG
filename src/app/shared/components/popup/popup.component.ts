import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  @Input() size: String = 'medium';
  @Input() header: String = '';
  @Input() description: String = '';
  @Input() children: Object = {};
  @Input() onClose: Function = () => {};

  classes = `popup popupSize-${this.size}`;
  constructor() { }

  ngOnInit(): void {
  }

}
