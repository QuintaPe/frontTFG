import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent implements OnInit {
  @Input() options: {name: String, icon:string, to: string }[] = [];
  @Input() showAside: Boolean = true;
  @Output() onClick = new EventEmitter<String>();
  innerWidth: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
  }

  emitEvent() {
    if (this.innerWidth < 768) {
      this.onClick.emit();
    }
  }
}
