import { Component, inject } from '@angular/core';
import { AuthService } from '@app/auth/services/auth.service';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss']
})

export class EditAccountComponent {
  public authService = inject(AuthService);
}
