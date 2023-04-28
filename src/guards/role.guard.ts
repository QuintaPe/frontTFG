import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard {

  constructor(private authService: AuthService, private router: Router) {}

  canLoad(route:ActivatedRouteSnapshot): boolean {
    const role = route.params['role'];
    const userRole = this.authService?.user?.role;
    if (userRole !== role) {
      this.router.navigate([''])
    }
    return userRole === role;
  }

  allowedRoles(roles: string[]): boolean {
    return !!this.authService?.user?.role && roles.includes(this.authService.user.role);
  }
}