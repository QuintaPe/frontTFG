import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgFor } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '@app/auth/services/auth.service';
import { TranslateService } from '@ngx-translate/core';

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
  showAside!:boolean;

  authService = inject(AuthService);
  translate = inject(TranslateService);

  ngOnInit(): void {
    this.routes = this.getRoutes(this.authService.user.role);
  }

  getRoutes = (role: string) => {
    switch (role) {
      case 'admin':
        return [
          { icon: 'work', name: this.translate.instant('campsite.campsites'), path: 'campings' },
          { icon: 'local_offer', name: this.translate.instant('common.bookings'), path: 'bookings' },
          { icon: 'person', name: this.translate.instant('common.users'), path: 'users' }
        ];
      case 'manager':
        return [
          { icon: 'work', name: this.translate.instant('user.myCampings'), path: 'campings' },
          { icon: 'person', name: this.translate.instant('user.profile'), path: 'profile' },
        ];
    default:
      return [
        { icon: 'local_offer', name: this.translate.instant('user.myBookings'), path: 'bookings' },
        { icon: 'favorite', name: this.translate.instant('campsite.favorites'), path: 'favorites' },
        { icon: 'person', name: this.translate.instant('user.profile'), path: 'profile' }
      ];
    }
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
