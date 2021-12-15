import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable()
export class CanActivateAnyUser implements CanActivate {
  role: string | undefined;

  constructor(private loginService: LoginService) {
    this.loginService.role$.subscribe((roleFromService) => {
      this.role = roleFromService;
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.role !== undefined;
  }
}
