import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class LoggedBefore implements CanActivate {

    public constructor(private router: Router, private authService: AuthService) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
            const token = localStorage.getItem('token');
            if(token){
                let role = this.authService.CurrentUserRole;
                switch(role){
                    case "ADMIN" || "SUPERADMIN":{
                        this.router.navigate(['/dashboard']);
                        return false;
                    }
                    case "RESOURCE":{
                        this.router.navigate(['/profile']);
                        return false;
                    }
                }
            }
            return true;
    }
}
