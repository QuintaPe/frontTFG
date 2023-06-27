import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';

export const canLoad = (route:ActivatedRouteSnapshot): boolean => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const role = route.params['role'];
  const userRole = authService?.user?.role;
  if (userRole !== role) {
    router.navigate([''])
  }
  return userRole === role;
}

export const allowedRole = (role: string): boolean => {
  const authService = inject(AuthService);
  return role  === authService.user.role;
}
