import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable()
export class AuthInterceptor {
  token: string;

  constructor(private loginService: LoginService) {
    this.loginService.token$.subscribe((token) => {
      this.token = token;
    });
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.token == undefined) {
      return next.handle(req);
    }
    const xhr = req.clone({
      setHeaders: {
        Authorization: 'Basic ' + this.token,
      },
    });
    return next.handle(xhr);
  }
}
