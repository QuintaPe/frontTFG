import { CommonModule } from '@angular/common';
import { Component, Input ,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class TabsComponent {
  @Input() tabs: string[] = [];
  @Output() onTabChange = new EventEmitter<number>();
  activatedTab: number = 0;

  setTab(index:number) {
    this.activatedTab = index;
    this.onTabChange.emit(this.activatedTab);
  }
}
