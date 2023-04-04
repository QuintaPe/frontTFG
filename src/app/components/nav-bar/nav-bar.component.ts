import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  showPopup =false

  constructor(
    public router: Router,
    public authService: AuthService,
  ) {}

  ngOnInit(): void {
  }

  navigateTo = (route: String) => {
    return this.router.navigate([this.authService.user.role, route]);
  }

  logout = () => {
    this.authService.logout()
    this.router.navigate(['/login']);
  }

}
