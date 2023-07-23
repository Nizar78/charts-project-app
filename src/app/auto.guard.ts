// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TutorialService } from './tutorial.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private tutorialService: TutorialService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const isAuthenticated = this.tutorialService.isAuthenticated();

    if (isAuthenticated) {
      return true;
    } else {
      // Redirect to the login page with the return URL as a query parameter
      return this.router.createUrlTree(['/login'], {
        queryParams: { returnUrl: state.url }
      });
    }
  }
}
