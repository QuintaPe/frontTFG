import { Component, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { NgClass, NgFor } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '@app/auth/services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs';

interface Route {
  name: string,
  icon: string,
  path: string,
  active: boolean,
}

@Component({
    selector: 'app-left-menu',
    templateUrl: './left-menu.component.html',
    styleUrls: ['./left-menu.component.scss'],
    standalone: true,
    imports: [MatIconModule, NgFor, NgClass, RouterLink, RouterOutlet]
})

export class LeftMenuComponent implements OnInit {
  routes: Route[] = [];
  showAside!:boolean;

  authService = inject(AuthService);
  translate = inject(TranslateService);
  router = inject(Router);

  ngOnInit(): void {
    this.getRoutes();
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.getRoutes();
    });
    this.translate.onLangChange.subscribe(this.getRoutes);
  }

  getRoutes = () => {
    let routes;
    switch (this.authService.user.role) {
      case 'admin':
        routes = [
          { icon: 'forest', name: this.translate.instant('campsite.campsites'), path: 'campings' },
          { icon: 'sticky_note_2', name: this.translate.instant('common.bookings'), path: 'bookings' },
          { icon: 'group', name: this.translate.instant('common.users'), path: 'users' },
          { icon: 'person', name: this.translate.instant('user.profile'), path: 'profile' },
          { icon: 'mail', name: this.translate.instant('internalMail.internalMail'), path: 'conversations' },
        ];
        break;
      case 'manager':
        routes = [
          { icon: 'forest', name: this.translate.instant('user.myCampings'), path: 'campings' },
          { icon: 'person', name: this.translate.instant('user.profile'), path: 'profile' },
          { icon: 'mail', name: this.translate.instant('internalMail.internalMail'), path: 'conversations' },
        ];
        break;
      default:
        routes = [
          { icon: 'sticky_note_2', name: this.translate.instant('user.myBookings'), path: 'bookings' },
          { icon: 'favorite_border', name: this.translate.instant('campsite.favorites'), path: 'favorites' },
          { icon: 'person', name: this.translate.instant('user.profile'), path: 'profile' },
          { icon: 'mail', name: this.translate.instant('internalMail.internalMail'), path: 'conversations' },
        ];
    }
    this.routes = routes.map(route => ({
      ...route,
      active: this.router.url.startsWith(`/${this.authService.user.role}/${route.path}`)
    }))
  }

  toggleMenu() {
    this.showAside = !this.showAside;
    localStorage.setItem('showAside', this.showAside.toString());
  }

  closeMenu() {
    if (window.innerWidth < 765) {
      this.showAside = false;
      localStorage.setItem('showAside', 'false');
    }
  }
}
