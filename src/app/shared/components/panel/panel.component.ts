import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  @Input() title: string = '';
  @Input() breadcrumb: any = null;
  @Input() class: string = '';
  
  constructor(public router: Router) {}
  ngOnInit(): void {}

}
