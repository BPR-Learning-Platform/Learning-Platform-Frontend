import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from "rxjs/operators";
import {AuthenticationService} from "./services/authentication.service";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap({
        next: () => {},
        error: err => {
          if (err instanceof HttpErrorResponse) {
            switch (err.status) {
              case 401:
              case 403:
                this.authService.logout();
                this.router.navigateByUrl("/login");
                break;
              default:
                break;
            }
          }
        }
      }));
  }
}
