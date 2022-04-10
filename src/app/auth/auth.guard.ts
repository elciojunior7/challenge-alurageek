import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  NavigationExtras,
} from '@angular/router';
import { GeneralService } from '../services/general.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private generalService: GeneralService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {
    const url: string = state.url;

    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean | Promise<boolean>{
    if(this.generalService.checkLogin())
      return true;
    else {
        const navigationExtras: NavigationExtras = {
            queryParams: { urlRedirect: url }
        };
        return this.router.navigateByUrl('/login', navigationExtras);
    }
  }
}
