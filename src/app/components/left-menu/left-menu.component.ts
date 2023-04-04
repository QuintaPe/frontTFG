import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Route {
  name: string,
  icon: string,
  path: string,
}

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent implements OnInit {
  routes: Route[] = [];
  activeRole:string = ''
  showAside!:boolean;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.activeRole = params['role'];
      switch (params['role']) {
        case 'manager':
          this.routes = [
            { icon: 'work', name: 'Campings', path: 'campings' },
            { icon: 'person', name: 'Profile', path: 'profile' }
          ];
          break;
      case 'admin':
        this.routes = [];
        break;
      default:
        this.routes = [
          { icon: 'work', name: 'Campings', path: 'campings' },
          { icon: 'person', name: 'Profile', path: 'profile' }
        ];
        break;
      }
    });
  }

  toggleMenu() {
    this.showAside = !this.showAside;
    localStorage.setItem('showAside', this.showAside.toString());
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth < 768) {
      this.toggleMenu();
    }
  }
}
