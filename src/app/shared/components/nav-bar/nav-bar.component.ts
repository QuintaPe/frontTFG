import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AvatarComponent } from '@shared/components/Avatar/avatar.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  standalone: true,
  imports: [ButtonComponent, AvatarComponent, RouterLink, NgIf],
})

export class NavBarComponent {
  showPopup = false

  router = inject(Router);
  authService = inject(AuthService);

  logout = () => {
    this.authService.logout()
    this.router.navigate(['/login']);
  }

}
