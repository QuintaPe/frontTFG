import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard {

  constructor(private authService: AuthService) {}

  canLoad(route:ActivatedRouteSnapshot): boolean {
    const role = route.params['role'];
    const userRole = this.authService.user.role;
    return userRole === role;
  }
}