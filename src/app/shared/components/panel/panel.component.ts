import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { NgIf, NgFor } from '@angular/common';

@Component({
    selector: 'app-panel',
    templateUrl: './panel.component.html',
    styleUrls: ['./panel.component.scss'],
    standalone: true,
    imports: [NgIf, NgFor, MatIconModule]
})
export class PanelComponent implements OnInit {
  @Input() title: string = '';
  @Input() breadcrumb: any = null;
  @Input() class: string = '';
  @Input() fullHeight: boolean = false;

  constructor(public router: Router) {}
  ngOnInit(): void {}

}
