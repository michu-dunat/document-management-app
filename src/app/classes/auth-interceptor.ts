import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (sessionStorage.getItem('token') == undefined) {
      return next.handle(req);
    }
    const xhr = req.clone({
      setHeaders: {
        Authorization: 'Basic ' + sessionStorage.getItem('token'),
      },
    });
    return next.handle(xhr);
  }
}
