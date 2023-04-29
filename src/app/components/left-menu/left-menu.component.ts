import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { NgFor } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

interface Route {
  name: string,
  icon: string,
  path: string,
}

@Component({
    selector: 'app-left-menu',
    templateUrl: './left-menu.component.html',
    styleUrls: ['./left-menu.component.scss'],
    standalone: true,
    imports: [MatIconModule, NgFor, RouterLink, RouterOutlet]
})

export class LeftMenuComponent implements OnInit {
  routes: Route[] = [];
  activeRole:string = ''
  showAside!:boolean;

  route = inject(ActivatedRoute);

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
}
