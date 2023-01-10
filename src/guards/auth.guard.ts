import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from "../app/auth/services/auth.service"

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        public router: Router,
        public authService: AuthService,
    ) { }

    canActivate() {
        if (!this.authService.isUserAuth) 
            this.router.navigate(['login']);

        return this.authService.isUserAuth;    
    }
}