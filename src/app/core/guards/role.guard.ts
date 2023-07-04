import { inject } from '@angular/core';
import { AuthService } from '@app/auth/services/auth.service';

export const allowedRole = (role: string): boolean => {
  const authService = inject(AuthService);
  return role  === authService.user.role;
}
