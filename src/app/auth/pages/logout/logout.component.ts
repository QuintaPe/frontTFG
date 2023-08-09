import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '@app/auth/services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {
  protected authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.logout();
  }
}
