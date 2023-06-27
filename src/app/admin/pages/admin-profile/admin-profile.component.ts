import { Component, inject } from '@angular/core';
import { AuthService } from '@app/auth/services/auth.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})

export class AdminProfileComponent {
  public authService = inject(AuthService);
}
