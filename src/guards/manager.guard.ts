import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from "../app/auth/services/auth.service"

@Injectable()
export class ManagerGuard implements CanActivate {
    constructor(
        public router: Router,
        public authService: AuthService,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authService.user?.role === 'user') {
            this.router.navigate(['/user']);
            return false;
        }

        if (this.authService.user?.role === 'admin') {
            this.router.navigate(['/admin']);
            return false;
        }

        if (!this.authService.user.camping && state.url !== '/manager/camping/new') {
            this.router.navigate(['manager/camping/new']);
            return false;
        }

        return true 
    }
}