import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from "../app/auth/services/auth.service"

@Injectable()
export class UserGuard implements CanActivate {
    constructor(
        public router: Router,
        public authService: AuthService,
    ) { }

    canActivate() {
        if (this.authService.user?.role === 'manager') {
            this.router.navigate(['/manager']);
            return false;
        }

        if (this.authService.user?.role === 'admin') {
            this.router.navigate(['/admin']);
            return false;
        }

        return this.authService.user?.role === 'user';    
    }
}