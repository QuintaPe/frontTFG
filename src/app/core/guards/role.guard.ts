import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';

export const allowedRole = (role: string): boolean => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (role  !== authService.user.role) {
    router.navigate([authService.user.role]);
  }
  return role  === authService.user.role;
}
