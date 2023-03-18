import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from "../app/auth/services/auth.service"

@Injectable()
export class HomeGuard implements CanActivate {
    constructor(
        public router: Router,
        public authService: AuthService,
    ) { }

    canActivate(): boolean {
        if (this.authService.user?.role === 'manager') {
            this.router.navigate(['/manager/create-camping']);
            return false;
        }
        
        if ((this.authService.user?.role === 'admin')) {
            this.router.navigate(['admin']);
            return false;
        }
    
        if (!this.authService.user) {
            this.router.navigate(['login']);
            return false;
        }
    
        return true;
    }

    
    
}